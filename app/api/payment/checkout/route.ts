import { chargilyClient } from '@/lib/chargily';
import { auth } from '@clerk/nextjs'; // Switched to @clerk/nextjs as it is used in this next.js version 14 based on middleware
import { createAdminClient } from '@/lib/supabase-admin';
import { rateLimit } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const allowed = rateLimit(`checkout_${userId}`, 5, 60000);
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await req.json();
  const { gigId, gigTitle, amount, sellerId } = body;

  if (!gigId || typeof gigId !== 'string' || !gigTitle || typeof gigTitle !== 'string' || !amount || typeof amount !== 'number' || !sellerId || typeof sellerId !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const checkout = await chargilyClient.createCheckout({
      amount: amount,
      currency: 'dzd',
      payment_method: 'edahabia',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard/personal/orders?success=true`,
      failure_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/gigs/${gigId}?failed=true`,
      webhook_endpoint: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/payment/webhook`,
      description: gigTitle,
      metadata: {
        gig_id: gigId,
        buyer_clerk_id: userId,
        seller_clerk_id: sellerId,
      },
    });

    const supabase = createAdminClient();
    
    const { data: buyer } = await supabase.from('profiles').select('id').eq('clerk_id', userId).single();
    const { data: seller } = await supabase.from('profiles').select('id').eq('clerk_id', sellerId).single();
    
    if (buyer && seller) {
      const { error: insertError } = await supabase.from('orders').insert({
        gig_id: gigId,
        buyer_id: buyer.id,
        seller_id: seller.id,
        amount: amount,
        status: 'pending',
        stripe_payment_id: checkout.id
      });
      if (insertError) console.error('Order insert error:', insertError);
    }

    return Response.json({ checkout_url: checkout.checkout_url });
  } catch (error) {
    console.error('Chargily error:', error);
    return Response.json({ error: 'Payment failed' }, { status: 500 });
  }
}
