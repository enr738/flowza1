import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
    const { userId } = auth();
    if (!userId) return new Response('Unauthorized', { status: 401 });

    const { role } = await req.json();
    const supabase = createServerSupabaseClient();

    await supabase
        .from('profiles')
        .update({ role })
        .eq('clerk_id', userId);

    return new Response('OK', { status: 200 });
}
