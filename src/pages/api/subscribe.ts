import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY || '');
const AUDIENCE_ID = import.meta.env.RESEND_AUDIENCE_ID || '';

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

    if (AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    try {
      await resend.emails.send({
        from: 'Brick Wire <hello@brickwire.com>',
        to: email,
        subject: 'Welcome to Brick Wire!',
        html: `<h1>Welcome to Brick Wire!</h1><p>You're now subscribed to the daily brief.</p>`,
      });
    } catch {
      // welcome email is optional
    }

    const redirectUrl = new URL('/newsletter-signup/?success=true', request.url);
    return Response.redirect(redirectUrl, 302);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
};
