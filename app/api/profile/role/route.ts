import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { role } = await req.json();
  
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
