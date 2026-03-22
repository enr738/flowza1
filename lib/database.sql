-- Profiles
CREATE TABLE profiles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id     TEXT UNIQUE NOT NULL,
  username     TEXT UNIQUE,
  email        TEXT,
  avatar_url   TEXT,
  bio          TEXT,
  role         TEXT CHECK (role IN ('seller','buyer_personal','buyer_company')),
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Company profiles
CREATE TABLE company_profiles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_size TEXT CHECK (company_size IN ('1-10','11-50','51-200','200+')),
  industry     TEXT,
  website      TEXT,
  tax_id       TEXT,
  country      TEXT,
  verified     BOOLEAN DEFAULT false,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Company members
CREATE TABLE company_members (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id   UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
  profile_id   UUID REFERENCES profiles(id),
  role         TEXT CHECK (role IN ('owner','admin','member')),
  invited_at   TIMESTAMP DEFAULT NOW(),
  joined_at    TIMESTAMP
);

-- Company budget
CREATE TABLE company_budgets (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id   UUID REFERENCES company_profiles(id),
  total_budget DECIMAL(10,2),
  spent_amount DECIMAL(10,2) DEFAULT 0,
  period       TEXT CHECK (period IN ('monthly','quarterly','yearly')),
  reset_date   TIMESTAMP
);

-- Gigs
CREATE TABLE gigs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id    UUID REFERENCES profiles(id),
  title        TEXT NOT NULL,
  description  TEXT,
  price        DECIMAL(10,2),
  category     TEXT,
  images       TEXT[],
  rating_avg   DECIMAL(3,2) DEFAULT 0,
  rating_count INT DEFAULT 0,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id            UUID REFERENCES gigs(id),
  buyer_id          UUID REFERENCES profiles(id),
  seller_id         UUID REFERENCES profiles(id),
  company_id        UUID REFERENCES company_profiles(id),
  stripe_payment_id TEXT,
  status            TEXT CHECK (status IN
                    ('pending','active','in_review','completed','cancelled')),
  amount            DECIMAL(10,2),
  created_at        TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id    UUID REFERENCES profiles(id),
  receiver_id  UUID REFERENCES profiles(id),
  order_id     UUID REFERENCES orders(id),
  content      TEXT NOT NULL,
  is_read      BOOLEAN DEFAULT false,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     UUID REFERENCES orders(id) UNIQUE,
  reviewer_id  UUID REFERENCES profiles(id),
  seller_id    UUID REFERENCES profiles(id),
  rating       INT CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Contact messages
CREATE TABLE contact_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (clerk_id = current_user);

CREATE POLICY "Gigs are viewable by everyone"
  ON gigs FOR SELECT USING (true);

CREATE POLICY "Sellers can manage own gigs"
  ON gigs FOR ALL USING (
    seller_id IN (
      SELECT id FROM profiles WHERE clerk_id = current_user
    )
  );
