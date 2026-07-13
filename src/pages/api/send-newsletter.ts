export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import React from 'react';
import { createHmac, timingSafeEqual } from 'node:crypto';
import DailyBrief from '../../emails/DailyBrief';
import { getActiveSubscribers, createNewsletterSend, updateNewsletterSend, logSend } from '../../lib/supabase';
import { client, BRIEFS_QUERY } from '../../lib/sanity';

const resend = new Resend(import.meta.env.RESEND_API_KEY || '');
const WEBHOOK_SECRET = import.meta.env.SANITY_WEBHOOK_SECRET || '';

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    const signature = request.headers.get('x-sanity-signature') || '';

    if (WEBHOOK_SECRET && signature) {
      const hmac = createHmac('sha256', WEBHOOK_SECRET).update(rawBody).digest('hex');
      const expected = Buffer.from(hmac, 'utf8');
      const actual = Buffer.from(signature, 'utf8');
      if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
        return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401 });
      }
    }

    const document = body;
    const edition = document.edition || 'national';
    const title = document.title || `${edition.charAt(0).toUpperCase() + edition.slice(1)} Brief`;

    const { data: briefs, error: briefsError } = await client.fetch<Array<{
      title: string;
      slug: { current: string };
      excerpt?: string;
      sector?: { name: string };
      sponsored?: boolean;
    }>>(BRIEFS_QUERY);

    if (briefsError || !briefs) {
      return new Response(JSON.stringify({ error: 'Failed to fetch briefs' }), { status: 500 });
    }

    const articles = briefs.slice(0, 10).map((b) => ({
      title: b.title,
      slug: b.slug.current,
      excerpt: b.excerpt || '',
      category: b.sector?.name,
      sponsored: b.sponsored,
    }));

    const { data: subscribers, error: subsError } = await getActiveSubscribers();
    if (subsError || !subscribers) {
      return new Response(JSON.stringify({ error: 'Failed to fetch subscribers' }), { status: 500 });
    }

    if (subscribers.length === 0) {
      return new Response(JSON.stringify({ message: 'No active subscribers' }), { status: 200 });
    }

    const { data: sendRecord, error: sendError } = await createNewsletterSend({
      subject: title,
      edition,
      totalRecipients: subscribers.length,
    });

    if (sendError || !sendRecord) {
      return new Response(JSON.stringify({ error: 'Failed to create send record' }), { status: 500 });
    }

    const baseUrl = import.meta.env.BASE_URL || 'https://brickwire.com';
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    let successCount = 0;
    let failCount = 0;
    const batchSize = 50;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      const emailPromises = batch.map(async (sub) => {
        try {
          const html = render(
            React.createElement(DailyBrief, {
              edition: edition.charAt(0).toUpperCase() + edition.slice(1),
              date: today,
              articles,
              unsubscribeToken: sub.unsubscribe_token,
              baseUrl,
            })
          );

          await resend.emails.send({
            from: 'Brick Wire <hello@brickwire.com>',
            to: sub.email,
            subject: title,
            html,
          });

          await logSend({
            subscriberId: sub.id,
            newsletterSendId: sendRecord.id,
            status: 'sent',
          });

          return 'success';
        } catch (err) {
          await logSend({
            subscriberId: sub.id,
            newsletterSendId: sendRecord.id,
            status: 'failed',
            error: err instanceof Error ? err.message : 'Unknown error',
          });
          return 'fail';
        }
      });

      const results = await Promise.all(emailPromises);
      successCount += results.filter((r) => r === 'success').length;
      failCount += results.filter((r) => r === 'fail').length;
    }

    await updateNewsletterSend({
      id: sendRecord.id,
      successCount,
      failCount,
    });

    return new Response(
      JSON.stringify({ success: true, total: subscribers.length, successCount, failCount }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Something went wrong' }),
      { status: 500 }
    );
  }
};
