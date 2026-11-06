-- GAAN Seed Data: Legal Sample Catalogue
-- Uses authorized, royalty-free audio tracks & high-resolution Unsplash music photography

-- Clean existing seed entries if re-running
DELETE FROM public.playlist_songs;
DELETE FROM public.playlists;
DELETE FROM public.songs;
DELETE FROM public.albums;
DELETE FROM public.artists;
DELETE FROM public.genres;

-- 1. Insert Genres
INSERT INTO public.genres (id, name, slug, image_url, accent_color) VALUES
('11111111-1111-1111-1111-111111111101', 'Synthwave & Retrowave', 'synthwave', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80', '#A855F7'),
('11111111-1111-1111-1111-111111111102', 'Lo-Fi Chill & Beats', 'lo-fi', 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80', '#8B5CF6'),
('11111111-1111-1111-1111-111111111103', 'Cyberpunk & Electro', 'cyberpunk', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', '#EC4899'),
('11111111-1111-1111-1111-111111111104', 'Deep Ambient & Space', 'ambient', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', '#6366F1'),
('11111111-1111-1111-1111-111111111105', 'Indie Melodic Rock', 'indie', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80', '#10B981'),
('11111111-1111-1111-1111-111111111106', 'Acoustic & Serene', 'acoustic', 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80', '#F59E0B');

-- 2. Insert Artists
INSERT INTO public.artists (id, name, bio, image_url, header_url, verified, monthly_listeners) VALUES
('22222222-2222-2222-2222-222222222201', 'Neon Mirage', 'Pioneer of analog synthesizers and dystopian retro-futuristic soundscapes from Berlin.', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80', true, 1845000),
('22222222-2222-2222-2222-222222222202', 'Aura Minimal', 'Crafting introspective lo-fi textures and warm tape-saturated chords for late night dreaming.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80', true, 920400),
('22222222-2222-2222-2222-222222222203', 'Solstice Orbit', 'Cinematic post-rock and electronic fusion pushing harmonic resonance to cosmic boundaries.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', true, 1420000),
('22222222-2222-2222-2222-222222222204', 'Komorebi Sound', 'Organic ambient arrangements blending field recordings with gentle piano and harp flourishes.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=1200&q=80', false, 580000);

-- 3. Insert Albums
INSERT INTO public.albums (id, title, artist_id, cover_url, release_date, type, total_tracks) VALUES
('33333333-3333-3333-3333-333333333301', 'Midnight Odyssey', '22222222-2222-2222-2222-222222222201', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', '2026-02-14', 'album', 3),
('33333333-3333-3333-3333-333333333302', 'Tape Loops & Rain', '22222222-2222-2222-2222-222222222202', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', '2026-05-18', 'album', 2),
('33333333-3333-3333-3333-333333333303', 'Starlight Singularity', '22222222-2222-2222-2222-222222222203', 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80', '2026-08-01', 'album', 2),
('33333333-3333-3333-3333-333333333304', 'Ephemeral Forest', '22222222-2222-2222-2222-222222222204', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80', '2026-09-22', 'single', 1);

-- 4. Insert Songs (with live legal SoundHelix sample audio streams)
INSERT INTO public.songs (id, title, artist_id, album_id, genre_id, duration_seconds, audio_url, cover_url, lyrics, plays_count, likes_count, is_explicit) VALUES
(
  '44444444-4444-4444-4444-444444444401',
  'Cybernetic Skyline',
  '22222222-2222-2222-2222-222222222201',
  '33333333-3333-3333-3333-333333333301',
  '11111111-1111-1111-1111-111111111101',
  372,
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  '[00:15.00] Cruising through the neon haze\n[00:30.00] Electric shadows in purple glaze\n[01:00.00] Speeding through the grid tonight\n[01:30.00] Guided by the violet light\n[02:00.00] GAAN plays the pulse of tomorrow\n[02:30.00] Transcending digital sorrow',
  452100,
  38200,
  false
),
(
  '44444444-4444-4444-4444-444444444402',
  'Neon Highway 86',
  '22222222-2222-2222-2222-222222222201',
  '33333333-3333-3333-3333-333333333301',
  '11111111-1111-1111-1111-111111111101',
  423,
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
  '[00:20.00] Midnight highway stretches on\n[00:45.00] Chasing the horizon until the dawn\n[01:25.00] Synthetic resonance fills the air\n[02:10.00] Drifting freely without a care',
  320140,
  24150,
  false
),
(
  '44444444-4444-4444-4444-444444444403',
  'Midnight Echoes',
  '22222222-2222-2222-2222-222222222201',
  '33333333-3333-3333-3333-333333333301',
  '11111111-1111-1111-1111-111111111101',
  348,
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
  '[00:10.00] Lost in the reverberation\n[00:40.00] A subterranean sensation\n[01:15.00] Basslines pulsing in dark AMOLED\n[01:50.00] Every memory softly unsaid',
  198300,
  16500,
  false
),
(
  '44444444-4444-4444-4444-444444444404',
  'Late Night Study Session',
  '22222222-2222-2222-2222-222222222202',
  '33333333-3333-3333-3333-333333333302',
  '11111111-1111-1111-1111-111111111102',
  302,
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
  '[Instrumental Lo-Fi Chill Beats]',
  612400,
  52400,
  false
),
(
  '44444444-4444-4444-4444-444444444405',
  'Coffee in the Rain',
  '22222222-2222-2222-2222-222222222202',
  '33333333-3333-3333-3333-333333333302',
  '11111111-1111-1111-1111-111111111102',
  284,
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
  '[Cozy Lo-Fi Rain Instrumental]',
  490200,
  41100,
  false
),
(
  '44444444-4444-4444-4444-444444444406',
  'Cosmic Aurora',
  '22222222-2222-2222-2222-222222222203',
  '33333333-3333-3333-3333-333333333303',
  '11111111-1111-1111-1111-111111111104',
  395,
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
  '[00:25.00] Across the interstellar dust\n[00:55.00] In starry constellations we trust\n[01:40.00] Floating above gravitational tides\n[02:20.00] The cosmic symphony abides',
  284300,
  21800,
  false
),
(
  '44444444-4444-4444-4444-444444444407',
  'Solar Flare Groove',
  '22222222-2222-2222-2222-222222222203',
  '33333333-3333-3333-3333-333333333303',
  '11111111-1111-1111-1111-111111111103',
  360,
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
  '[00:15.00] Ignition sparks the sound machine\n[00:45.00] The wildest rhythm you have seen\n[01:30.00] Feel the heat ignite your soul\n[02:00.00] Electric cadence takes control',
  175200,
  14300,
  false
),
(
  '44444444-4444-4444-4444-444444444408',
  'Whispering Pines',
  '22222222-2222-2222-2222-222222222204',
  '33333333-3333-3333-3333-333333333304',
  '11111111-1111-1111-1111-111111111106',
  315,
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
  '[Acoustic Forest Ambient Instrumental]',
  128900,
  11200,
  false
);
