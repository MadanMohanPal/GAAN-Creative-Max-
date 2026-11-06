# Supabase & PostgreSQL Database Setup Guide

## Quick Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a new project.

2. **Execute Database Migrations**:
   - Navigate to the **SQL Editor** in your Supabase Dashboard.
   - Open and run `gaan/database/migrations/01_initial_schema.sql`.
   - This provisions all 10 core tables, RLS policies, automatic user profile creation triggers, and storage buckets (`covers`, `audio`, `avatars`).

3. **Load the Seed Catalogue**:
   - In the SQL Editor, execute `gaan/database/seeds/02_seed_data.sql`.
   - This populates legal sample music (SoundHelix public audio tracks), high-resolution album artwork, genres, artists, and curated playlists.

4. **Retrieve API Credentials**:
   - Go to **Project Settings** -> **API**.
   - Copy:
     - `Project URL`
     - `anon` / `public` Key
     - `service_role` Secret (Backend ONLY, never in frontend client code).

5. **Configure Environment Variables**:
   - `gaan/backend/.env`:
     ```env
     PORT=4000
     SUPABASE_URL=https://<your-project-id>.supabase.co
     SUPABASE_ANON_KEY=<your-anon-key>
     SUPABASE_SERVICE_ROLE_KEY=<your-service-role-secret>
     ```
   - `gaan/website/.env.local`:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:4000
     NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
     ```
