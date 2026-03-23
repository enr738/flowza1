import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is missing!');
    return new Response('Missing webhook secret', { status: 500 });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  const payload = await req.text();
  
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Invalid signature', { status: 401 });
  }

  if (evt.type === 'user.created') {
    const { id, email_addresses, image_url, username } = evt.data;
    const { error } = await supabase.from('profiles').insert({
      clerk_id: id,
      email: email_addresses[0]?.email_address,
      avatar_url: image_url,
      username: username || id,
    });
    if (error) console.error('Supabase insert error:', error);
  }

  if (evt.type === 'user.deleted') {
    const { id } = evt.data;
    await supabase.from('profiles').delete().eq('clerk_id', id);
  }

  return new Response('OK', { status: 200 });
}
