export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import React from 'react';
import Welcome from '../../emails/Welcome';
import { addSubscriber } from '../../lib/supabase';

const resend = new Resend(import.meta.env.RESEND_API_KEY || '');

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();
    const formLocation = formData.get('form_location')?.toString();
    const publication = formData.get('publication')?.toString();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    const { data: subscriber, error: subError } = await addSubscriber({
      email,
      firstName,
      lastName,
      publication,
      source: formLocation,
    });

    if (subError) {
      return new Response(JSON.stringify({ error: subError }), { status: 500 });
    }

    if (subscriber) {
      const baseUrl = import.meta.env.BASE_URL || 'https://brickwire.com';
      const html = render(
        React.createElement(Welcome, {
          firstName: firstName || 'there',
          unsubscribeToken: subscriber.unsubscribe_token,
          baseUrl,
        })
      );

      await resend.emails.send({
        from: 'Brick Wire <hello@brickwire.com>',
        to: email,
        subject: 'Welcome to Brick Wire!',
        html,
      });
    }

    const redirectUrl = new URL('/newsletter-signup/?success=true', request.url);
    return Response.redirect(redirectUrl, 302);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
};
