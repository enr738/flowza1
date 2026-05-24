import { createClient } from '@/lib/supabase';

export async function getProfileByClerkId(clerkId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, email')
    .eq('clerk_id', clerkId)
    .single();
  return data;
}

export async function getProfileById(profileId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, email')
    .eq('id', profileId)
    .single();
  return data;
}
