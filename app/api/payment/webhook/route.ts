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
    // Update existing pending order to active (checkout API already created the order)
    const { error: updateError } = await supabase.from('orders')
      .update({ status: 'active' })
      .eq('stripe_payment_id', event.data.id);
    
    if (updateError) {
      console.error('Order update error:', updateError);
    }
  }

  return new Response('OK', { status: 200 });
}
