import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
    const { name, email, subject, message } = await req.json();
    const supabase = createServerSupabaseClient();

    const { error } = await supabase
        .from('contact_messages')
        .insert({ name, email, subject, message });

    if (error) {
        return Response.json({ error: 'Failed to save message' }, { status: 500 });
    }

    return Response.json({ success: true });
}
