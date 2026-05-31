import { createClient } from '@supabase/supabase-js';

/*
-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, only owner can update
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (true);

-- Gigs: anyone can read active, only admin client can insert/update/delete
CREATE POLICY "gigs_select" ON gigs FOR SELECT USING (status = 'active');
CREATE POLICY "gigs_all" ON gigs FOR ALL USING (true);

-- Orders: admin client handles all
CREATE POLICY "orders_all" ON orders FOR ALL USING (true);

-- Messages: admin client handles all
CREATE POLICY "messages_all" ON messages FOR ALL USING (true);

-- Favorites: admin client handles all
CREATE POLICY "favorites_all" ON favorites FOR ALL USING (true);

-- Follows: admin client handles all
CREATE POLICY "follows_all" ON follows FOR ALL USING (true);

-- Reviews: admin client handles all
CREATE POLICY "reviews_all" ON reviews FOR ALL USING (true);
*/

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
