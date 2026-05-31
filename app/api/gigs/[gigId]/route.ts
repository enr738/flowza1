import { createAdminClient } from '@/lib/supabase-admin';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { gigId: string } }) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { gigId } = params;
  if (!gigId || typeof gigId !== 'string') {
    return NextResponse.json({ error: 'Invalid gig ID' }, { status: 400 });
  }

  const body = await req.json();
  const { title, description, category, price, delivery_days } = body;

  if (
    !title || typeof title !== 'string' || title.length > 80 ||
    !description || typeof description !== 'string' ||
    !category || typeof category !== 'string' ||
    !price || typeof price !== 'number' || price < 100 ||
    !delivery_days || typeof delivery_days !== 'number' || delivery_days < 1
  ) {
    return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  // Check ownership
  const { data: gig } = await supabase
    .from('gigs')
    .select('seller_id')
    .eq('id', gigId)
    .single();

  if (!gig) return NextResponse.json({ error: 'Gig not found' }, { status: 404 });
  if (gig.seller_id !== profile.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { error } = await supabase
    .from('gigs')
    .update({ title, description, category, price, delivery_days })
    .eq('id', gigId);

  if (error) {
    console.error('Gig update error:', error);
    return NextResponse.json({ error: 'Failed to update gig' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
