import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createAdminClient();

  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { role } = await req.json();
  
  if (!role || typeof role !== 'string' || role.length > 50) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }
  
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('clerk_id', userId);
  
  if (error) {
    console.error('Role update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  console.log(`Saved role ${role} for user ${userId}`);
  return NextResponse.json({ success: true });
}
