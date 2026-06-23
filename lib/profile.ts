import { createClient } from '@/lib/supabase';

export async function getProfileByClerkId(clerkId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, email, clerk_id, role')
    .eq('clerk_id', clerkId)
    .single();
  return data;
}

export async function getProfileById(profileId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, email, clerk_id, role')
    .eq('id', profileId)
    .single();
  return data;
}

export function getDisplayName(profile: any): string {
  return profile?.username || profile?.email?.split('@')[0] || 'Unknown';
}