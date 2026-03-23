-- Run this in Supabase SQL Editor to set up your database
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Allow public read access for the portfolio
DROP POLICY IF EXISTS "Allow public read access" ON photos;
CREATE POLICY "Allow public read access" ON photos
  FOR SELECT USING (true);

-- Allow insert, update, delete (you can add Supabase Auth later for secure admin)
DROP POLICY IF EXISTS "Allow all for anon" ON photos;
CREATE POLICY "Allow all for anon" ON photos
  FOR ALL USING (true) WITH CHECK (true);

-- Create storage bucket (or use Dashboard: Storage → New bucket, name: photos, public: true)
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Public read for photos" ON storage.objects;
CREATE POLICY "Public read for photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Allow uploads to photos" ON storage.objects;
CREATE POLICY "Allow uploads to photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'photos');

DROP POLICY IF EXISTS "Allow delete from photos" ON storage.objects;
CREATE POLICY "Allow delete from photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'photos');
