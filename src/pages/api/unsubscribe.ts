export const prerender = false;
import type { APIRoute } from 'astro';
import { unsubscribe } from '../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing unsubscribe token' }), { status: 400 });
  }

  const { success, error } = await unsubscribe(token);

  if (!success) {
    return new Response(JSON.stringify({ error: error || 'Failed to unsubscribe' }), { status: 400 });
  }

  const redirectUrl = new URL('/unsubscribe/?success=true', url);
  return Response.redirect(redirectUrl, 302);
};
