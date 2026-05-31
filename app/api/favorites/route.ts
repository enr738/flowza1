import { createAdminClient } from '@/lib/supabase-admin';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { gig_id } = body;

  if (!gig_id || typeof gig_id !== 'string') {
    return NextResponse.json({ error: 'Invalid gig_id' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: profile.id, gig_id });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { gig_id } = body;

  if (!gig_id || typeof gig_id !== 'string') {
    return NextResponse.json({ error: 'Invalid gig_id' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', userId)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', profile.id)
    .eq('gig_id', gig_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json({ success: true });
}
