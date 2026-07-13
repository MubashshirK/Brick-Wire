import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseKey = import.meta.env.SUPABASE_SERVICE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Subscriber {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  publication: string;
  source: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
  is_active: boolean;
  unsubscribe_token: string;
  metadata: Record<string, unknown>;
}

export async function addSubscriber({
  email,
  firstName,
  lastName,
  publication,
  source,
}: {
  email: string;
  firstName?: string;
  lastName?: string;
  publication?: string;
  source?: string;
}): Promise<{ data: Subscriber | null; error: string | null }> {
  const { data: existing, error: lookupError } = await supabase
    .from('subscribers')
    .select('id, email, is_active, unsubscribed_at, unsubscribe_token')
    .eq('email', email)
    .maybeSingle();

  if (lookupError) {
    return { data: null, error: lookupError.message };
  }

  if (existing) {
    if (!existing.is_active || existing.unsubscribed_at) {
      const { data, error } = await supabase
        .from('subscribers')
        .update({
          is_active: true,
          unsubscribed_at: null,
          first_name: firstName || existing.first_name || '',
          last_name: lastName || existing.last_name || '',
          publication: publication || '',
          source: source || '',
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data, error: null };
    }
    return { data: existing, error: null };
  }

  const { data, error } = await supabase
    .from('subscribers')
    .insert({
      email,
      first_name: firstName || '',
      last_name: lastName || '',
      publication: publication || '',
      source: source || '',
    })
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getActiveSubscribers(): Promise<{ data: Subscriber[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('is_active', true)
    .is('unsubscribed_at', null);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function unsubscribe(token: string): Promise<{ success: boolean; error: string | null }> {
  const { data, error } = await supabase
    .from('subscribers')
    .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)
    .eq('is_active', true)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  if (!data) return { success: false, error: 'Invalid or already unsubscribed' };
  return { success: true, error: null };
}

export async function createNewsletterSend({
  subject,
  edition,
  totalRecipients,
}: {
  subject: string;
  edition: string;
  totalRecipients: number;
}): Promise<{ data: { id: string } | null; error: string | null }> {
  const { data, error } = await supabase
    .from('newsletter_sends')
    .insert({ subject, edition, total_recipients: totalRecipients })
    .select('id')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateNewsletterSend({
  id,
  successCount,
  failCount,
}: {
  id: string;
  successCount: number;
  failCount: number;
}): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('newsletter_sends')
    .update({ success_count: successCount, fail_count: failCount })
    .eq('id', id);

  if (error) return { error: error.message };
  return { error: null };
}

export async function logSend({
  subscriberId,
  newsletterSendId,
  status,
  error: errorMsg,
}: {
  subscriberId: string;
  newsletterSendId: string;
  status: 'sent' | 'failed';
  error?: string;
}): Promise<void> {
  await supabase.from('send_logs').insert({
    subscriber_id: subscriberId,
    newsletter_send_id: newsletterSendId,
    status,
    error: errorMsg || null,
  });
}
