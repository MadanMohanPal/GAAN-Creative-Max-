-- GAAN Music Streaming Platform - Database Schema Migration
-- Compatible with Supabase PostgreSQL (with RLS & Auth integration)

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Genres
CREATE TABLE IF NOT EXISTS public.genres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    accent_color TEXT DEFAULT '#8B5CF6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Artists
CREATE TABLE IF NOT EXISTS public.artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    bio TEXT,
    image_url TEXT NOT NULL,
    header_url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    monthly_listeners INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Albums
CREATE TABLE IF NOT EXISTS public.albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
    cover_url TEXT NOT NULL,
    release_date DATE DEFAULT CURRENT_DATE,
    type TEXT DEFAULT 'album' CHECK (type IN ('album', 'single', 'ep')),
    total_tracks INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Songs
CREATE TABLE IF NOT EXISTS public.songs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
    album_id UUID REFERENCES public.albums(id) ON DELETE SET NULL,
    genre_id UUID REFERENCES public.genres(id) ON DELETE SET NULL,
    duration_seconds INTEGER NOT NULL,
    audio_url TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    lyrics TEXT,
    plays_count BIGINT DEFAULT 0,
    likes_count BIGINT DEFAULT 0,
    is_explicit BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Playlists
CREATE TABLE IF NOT EXISTS public.playlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    cover_url TEXT,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Playlist Songs (Junction table)
CREATE TABLE IF NOT EXISTS public.playlist_songs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    playlist_id UUID NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
    song_id UUID NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(playlist_id, song_id)
);

-- 9. Liked Songs
CREATE TABLE IF NOT EXISTS public.liked_songs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    song_id UUID NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, song_id)
);

-- 10. Listening History
CREATE TABLE IF NOT EXISTS public.listening_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    song_id UUID NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
    played_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    playback_seconds INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE
);

-- 11. User Preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'amoled-dark' CHECK (theme IN ('amoled-dark', 'midnight', 'purple-dark')),
    audio_quality TEXT DEFAULT 'high' CHECK (audio_quality IN ('auto', 'normal', 'high', 'lossless')),
    equalizer_preset TEXT DEFAULT 'balanced',
    normalize_volume BOOLEAN DEFAULT TRUE,
    autoplay_recommended BOOLEAN DEFAULT TRUE,
    offline_downloads_quality TEXT DEFAULT 'high',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.liked_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listening_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner update
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Catalogue: Genres, Artists, Albums, Songs are publicly viewable by all users
CREATE POLICY "Genres viewable by everyone" ON public.genres FOR SELECT USING (true);
CREATE POLICY "Artists viewable by everyone" ON public.artists FOR SELECT USING (true);
CREATE POLICY "Albums viewable by everyone" ON public.albums FOR SELECT USING (true);
CREATE POLICY "Songs viewable by everyone" ON public.songs FOR SELECT USING (true);

-- Playlists: Public playlists are viewable by all, private only by owner
CREATE POLICY "Public playlists viewable by everyone" 
ON public.playlists FOR SELECT 
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own playlists" 
ON public.playlists FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own playlists" 
ON public.playlists FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own playlists" 
ON public.playlists FOR DELETE USING (auth.uid() = user_id);

-- Playlist Songs: viewable if the playlist is accessible, modifiable by playlist owner
CREATE POLICY "Playlist songs viewable if playlist viewable" 
ON public.playlist_songs FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.playlists p 
        WHERE p.id = playlist_songs.playlist_id 
        AND (p.is_public = true OR p.user_id = auth.uid())
    )
);

CREATE POLICY "Users can modify songs in their own playlists" 
ON public.playlist_songs FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.playlists p 
        WHERE p.id = playlist_songs.playlist_id 
        AND p.user_id = auth.uid()
    )
);

-- Liked Songs: strictly private to each user
CREATE POLICY "Users can view their own liked songs" 
ON public.liked_songs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can like a song" 
ON public.liked_songs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike a song" 
ON public.liked_songs FOR DELETE USING (auth.uid() = user_id);

-- Listening History: strictly private to each user
CREATE POLICY "Users can view their listening history" 
ON public.listening_history FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can record listening history" 
ON public.listening_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Preferences: strictly private to each user
CREATE POLICY "Users can view their preferences" 
ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their preferences" 
ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their preferences" 
ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- ==========================================
-- AUTOMATIC PROFILE TRIGGER ON SIGNUP
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, avatar_url)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80')
    );
    
    INSERT INTO public.user_preferences (user_id)
    VALUES (new.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- STORAGE BUCKETS & POLICIES
-- ==========================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('covers', 'covers', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('audio', 'audio', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access for storage buckets
CREATE POLICY "Public covers access" ON storage.objects FOR SELECT USING (bucket_id = 'covers');
CREATE POLICY "Public avatars access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Public audio access" ON storage.objects FOR SELECT USING (bucket_id = 'audio');
