-- Enable UUID extension (optional, but good practice if we switch IDs later)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS (Matching types.ts)
DO $$ BEGIN
    CREATE TYPE role_type AS ENUM ('Maintainer', 'Contributor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE spec_status AS ENUM ('Draft', 'Review', 'Ratified', 'Archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE spec_category AS ENUM ('Core', 'Networking', 'Consensus', 'Economic', 'Meta');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE quest_status AS ENUM ('Proposed', 'Open', 'In Progress', 'Verification', 'Completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE contribution_type AS ENUM ('CODE_MERGE', 'ADR_AUTHOR', 'MEETING_HOST', 'MANUAL_BOUNTY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  role role_type NOT NULL DEFAULT 'Contributor',
  total_xp INTEGER DEFAULT 0,
  avatar_url TEXT
);

-- 2b. PROFILE SECRETS (Secure Credentials)
CREATE TABLE IF NOT EXISTS profile_secrets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) NOT NULL,
  access_key TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SPECS
CREATE TABLE IF NOT EXISTS specs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  filename TEXT NOT NULL,
  category spec_category NOT NULL,
  content TEXT NOT NULL,
  status spec_status NOT NULL DEFAULT 'Draft',
  author_id TEXT REFERENCES profiles(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  version INTEGER DEFAULT 1,
  target_spec_id TEXT REFERENCES specs(id)
);

-- 4. QUESTS
CREATE TABLE IF NOT EXISTS quests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty INTEGER NOT NULL CHECK (difficulty IN (1, 2, 3, 5, 8)),
  status quest_status NOT NULL DEFAULT 'Proposed',
  assignee_id TEXT REFERENCES profiles(id),
  proposer_id TEXT REFERENCES profiles(id) NOT NULL,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_update_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Voting Arrays
  votes_for TEXT[] DEFAULT '{}',
  votes_against TEXT[] DEFAULT '{}',
  
  -- Verification
  pr_link TEXT,
  verification_votes_for TEXT[] DEFAULT '{}',
  verification_votes_against TEXT[] DEFAULT '{}',

  -- Reason for Blocking (The Record)
  block_reason TEXT
);

-- 5. SIGNALS
CREATE TABLE IF NOT EXISTS signals (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) NOT NULL,
  area TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CONTRIBUTIONS (The Ledger)
CREATE TABLE IF NOT EXISTS contributions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) NOT NULL,
  type contribution_type NOT NULL,
  reference_link TEXT,
  weight INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT
);

-- 7. MEETINGS
CREATE TABLE IF NOT EXISTS meetings (
  id TEXT PRIMARY KEY,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  title TEXT NOT NULL,
  attendees TEXT[] DEFAULT '{}',
  summary TEXT,
  content TEXT
);

-- 8. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. SPEC VERSION HISTORY
CREATE TABLE IF NOT EXISTS spec_versions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  spec_id TEXT REFERENCES specs(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  version INTEGER NOT NULL,
  modified_by TEXT REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  change_summary TEXT
);

-- RLS POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_secrets ENABLE ROW LEVEL SECURITY;
ALTER TABLE specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE spec_versions ENABLE ROW LEVEL SECURITY;

-- Public Read Access
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read specs" ON specs FOR SELECT USING (true);
CREATE POLICY "Public read quests" ON quests FOR SELECT USING (true);
CREATE POLICY "Public read signals" ON signals FOR SELECT USING (true);
CREATE POLICY "Public read contributions" ON contributions FOR SELECT USING (true);
CREATE POLICY "Public read meetings" ON meetings FOR SELECT USING (true);
CREATE POLICY "Lazy Auth read notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Lazy Auth update notifications" ON notifications FOR UPDATE USING (true);
CREATE POLICY "Public read versions" ON spec_versions FOR SELECT USING (true);

-- UPDATED WRITE POLICIES (Allowing 'anon' write for this internal tool architecture)
-- Since we gate access via the Client App using `login_user`, we allow the API Key to write.
DROP POLICY IF EXISTS "Auth write access" ON quests;
CREATE POLICY "Public write quests" ON quests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update quests" ON quests FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Auth write access specs" ON specs;
CREATE POLICY "Public write specs" ON specs FOR ALL USING (true);

DROP POLICY IF EXISTS "Auth write access signals" ON signals;
CREATE POLICY "Public write signals" ON signals FOR ALL USING (true);

DROP POLICY IF EXISTS "Auth write access meetings" ON meetings;
CREATE POLICY "Public write meetings" ON meetings FOR ALL USING (true);

DROP POLICY IF EXISTS "Auth write access versions" ON spec_versions;
CREATE POLICY "Public write versions" ON spec_versions FOR INSERT WITH CHECK (true);

-- 9. FUNCTIONS & TRIGGERS

-- Secure Login RPC
CREATE OR REPLACE FUNCTION login_user(username_in TEXT, key_in TEXT)
RETURNS SETOF profiles AS $$
BEGIN
  RETURN QUERY 
  SELECT p.* 
  FROM profiles p
  JOIN profile_secrets s ON p.id = s.user_id
  WHERE p.username ILIKE username_in 
  AND s.access_key = key_in;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vote Toggle RPC (UPDATED V2)
create or replace function toggle_vote(
  quest_id text,
  user_id text,
  vote_type text,
  reason text default null
)
returns void as $$
declare
  target_col text;
  other_col text;
begin
  if vote_type = 'for' then
    target_col := 'votes_for';
    other_col := 'votes_against';
  elsif vote_type = 'against' then
    target_col := 'votes_against';
    other_col := 'votes_for';
  elsif vote_type = 'verify_for' then
    target_col := 'verification_votes_for';
    other_col := 'verification_votes_against';
  elsif vote_type = 'verify_against' then
    target_col := 'verification_votes_against';
    other_col := 'verification_votes_for';
  end if;

  -- Update arrays
  execute format('update quests set 
    %I = array_append(array_remove(%I, $2), $2),
    %I = array_remove(%I, $2),
    last_update_at = now()
    where id = $1', 
    target_col, target_col, other_col, other_col) 
  using quest_id, user_id;

  -- If reason is provided, set it.
  if reason is not null then
    update quests set block_reason = reason where id = quest_id;
  end if;
  
end;
$$ language plpgsql security definer;

-- Create Quest RPC (Bypasses RLS issues for Proposal Submission)
CREATE OR REPLACE FUNCTION create_quest_rpc(
    title_in text, 
    desc_in text, 
    diff_in int, 
    tag_in text, 
    proposer_id_in text
)
RETURNS jsonb AS $$
DECLARE
    new_id text;
    result jsonb;
BEGIN
    -- Generate simple random ID (3-digit) to match the "Quest #101" aesthetic
    -- In production, a sequence or UUID is better, but this fits the requested style.
    new_id := (floor(random() * 900) + 100)::text;
    
    INSERT INTO quests (
      id, title, description, difficulty, status, proposer_id, tag, 
      created_at, last_update_at, votes_for
    ) VALUES (
      new_id, title_in, desc_in, diff_in, 'Proposed', proposer_id_in, tag_in,
      now(), now(), ARRAY[proposer_id_in]
    ) RETURNING to_jsonb(quests.*) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create User RPC (For Admin Dashboard)
CREATE OR REPLACE FUNCTION create_user_rpc(
    username_in text, 
    role_in role_type, 
    password_in text
)
RETURNS void AS $$
DECLARE
  new_id text;
BEGIN
  new_id := uuid_generate_v4()::text;
  INSERT INTO profiles (id, username, role) VALUES (new_id, username_in, role_in);
  INSERT INTO profile_secrets (user_id, access_key) VALUES (new_id, password_in);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update Password RPC
CREATE OR REPLACE FUNCTION update_password_rpc(
    user_id_in text, 
    old_password_in text, 
    new_password_in text
)
RETURNS boolean AS $$
DECLARE
  valid boolean;
BEGIN
  SELECT EXISTS(SELECT 1 FROM profile_secrets WHERE user_id = user_id_in AND access_key = old_password_in) INTO valid;
  
  IF valid THEN
    UPDATE profile_secrets SET access_key = new_password_in WHERE user_id = user_id_in;
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;