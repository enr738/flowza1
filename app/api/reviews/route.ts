import { createAdminClient } from '@/lib/supabase-admin';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { order_id, gig_id, seller_id, rating, comment } = body;

  if (
    !order_id || typeof order_id !== 'string' ||
    !gig_id || typeof gig_id !== 'string' ||
    !seller_id || typeof seller_id !== 'string' ||
    typeof rating !== 'number' || rating < 1 || rating > 5 ||
    (comment && (typeof comment !== 'string' || comment.length > 500))
  ) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  // Verify the order belongs to this user and is completed/active
  const { data: order } = await supabase
    .from('orders')
    .select('id, status, buyer_id')
    .eq('id', order_id)
    .single();

  if (!order || order.buyer_id !== profile.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Insert review
  const { error: insertError } = await supabase
    .from('reviews')
    .insert({
      order_id,
      gig_id,
      seller_id,
      reviewer_id: profile.id,
      rating,
      comment
    });

  if (insertError) {
    // Unique constraint on order_id will prevent multiple reviews for same order
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }

  // Update gig average rating
  const { data: gigReviews } = await supabase
    .from('reviews')
    .select('rating')
    .eq('gig_id', gig_id);

  if (gigReviews && gigReviews.length > 0) {
    const avg = gigReviews.reduce((sum, r) => sum + r.rating, 0) / gigReviews.length;
    await supabase.from('gigs').update({
      rating_avg: avg,
      rating_count: gigReviews.length
    }).eq('id', gig_id);
  }

  return NextResponse.json({ success: true });
}
