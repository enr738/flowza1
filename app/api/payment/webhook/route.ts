import { verifySignature } from '@chargily/chargily-pay';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('signature') || '';

  const isValid = verifySignature(Buffer.from(payload), signature, process.env.CHARGILY_API_KEY!);
  if (!isValid) return new Response('Invalid signature', { status: 401 });

  const event = JSON.parse(payload);

  if (event.type === 'checkout.paid') {
    const { gig_id, buyer_clerk_id, seller_clerk_id } = event.data.metadata;

    // Get buyer and seller profiles
    const { data: buyer } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_id', buyer_clerk_id)
      .single();

    const { data: seller } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_id', seller_clerk_id)
      .single();

    // Create order in Supabase
    await supabase.from('orders').insert({
      gig_id,
      buyer_id: buyer?.id,
      seller_id: seller?.id,
      amount: event.data.amount,
      status: 'active',
      stripe_payment_id: event.data.id,
    });
  }

  return new Response('OK', { status: 200 });
}
