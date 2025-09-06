/*
  # User Analytics and Health Data Schema

  1. New Tables
    - `user_profiles` - Store user profile information
    - `health_queries` - Store AI doctor chat interactions
    - `fitness_activities` - Store step tracking, calories burned, etc.
    - `daily_goals` - Store daily fitness goals and completion status
    - `health_tips_interactions` - Track which tips users view
    - `symptom_uploads` - Store uploaded symptom files metadata
    - `user_sessions` - Track user sessions and engagement

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for the Edge Function to insert/update data

  3. Indexes
    - Add performance indexes for common queries
*/

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  age integer,
  weight_kg numeric(5,2),
  height_cm numeric(5,2),
  fitness_level text CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
  health_goals text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Health Queries Table (AI Doctor Interactions)
CREATE TABLE IF NOT EXISTS health_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id uuid DEFAULT gen_random_uuid(),
  user_query text NOT NULL,
  ai_response text,
  sentiment_score numeric(3,2), -- -1 to 1 sentiment analysis
  query_category text, -- symptoms, nutrition, exercise, etc.
  urgency_level text CHECK (urgency_level IN ('low', 'medium', 'high', 'emergency')),
  keywords text[],
  created_at timestamptz DEFAULT now()
);

-- Fitness Activities Table
CREATE TABLE IF NOT EXISTS fitness_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN ('steps', 'calories', 'cycling', 'gym', 'yoga', 'other')),
  activity_data jsonb NOT NULL, -- flexible storage for different activity types
  duration_minutes integer,
  calories_burned integer,
  steps_count integer,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Daily Goals Table
CREATE TABLE IF NOT EXISTS daily_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_type text NOT NULL,
  goal_text text NOT NULL,
  target_value numeric,
  current_value numeric DEFAULT 0,
  completed boolean DEFAULT false,
  completion_date timestamptz,
  streak_count integer DEFAULT 0,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, goal_type, date)
);

-- Health Tips Interactions Table
CREATE TABLE IF NOT EXISTS health_tips_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tip_id text NOT NULL,
  tip_title text NOT NULL,
  interaction_type text CHECK (interaction_type IN ('view', 'like', 'share', 'bookmark')),
  duration_seconds integer, -- how long they viewed the tip
  created_at timestamptz DEFAULT now()
);

-- Symptom Uploads Table
CREATE TABLE IF NOT EXISTS symptom_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_size integer,
  file_type text,
  upload_path text, -- Supabase storage path
  analysis_status text DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'processing', 'completed', 'failed')),
  analysis_results jsonb,
  created_at timestamptz DEFAULT now()
);

-- User Sessions Table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_start timestamptz DEFAULT now(),
  session_end timestamptz,
  page_views integer DEFAULT 1,
  actions_taken text[],
  device_info jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE fitness_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_tips_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own health queries"
  ON health_queries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own fitness activities"
  ON fitness_activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own daily goals"
  ON daily_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own health tips interactions"
  ON health_tips_interactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own symptom uploads"
  ON symptom_uploads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Edge Functions (using service role)
CREATE POLICY "Edge functions can insert health queries"
  ON health_queries FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Edge functions can update health queries"
  ON health_queries FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Edge functions can insert fitness activities"
  ON fitness_activities FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Edge functions can insert/update daily goals"
  ON daily_goals FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Edge functions can insert health tips interactions"
  ON health_tips_interactions FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Edge functions can insert/update symptom uploads"
  ON symptom_uploads FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Edge functions can insert/update user sessions"
  ON user_sessions FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Edge functions can insert/update user profiles"
  ON user_profiles FOR ALL
  TO service_role
  USING (true);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_health_queries_user_id ON health_queries(user_id);
CREATE INDEX IF NOT EXISTS idx_health_queries_created_at ON health_queries(created_at);
CREATE INDEX IF NOT EXISTS idx_fitness_activities_user_id ON fitness_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_fitness_activities_date ON fitness_activities(date);
CREATE INDEX IF NOT EXISTS idx_daily_goals_user_date ON daily_goals(user_id, date);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at trigger to user_profiles
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();