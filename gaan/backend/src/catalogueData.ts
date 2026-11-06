export interface Song {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  album_id?: string;
  album_title?: string;
  genre_id?: string;
  genre_name?: string;
  duration_seconds: number;
  audio_url: string;
  cover_url: string;
  lyrics?: string;
  plays_count: number;
  likes_count: number;
  is_explicit: boolean;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  header_url?: string;
  verified: boolean;
  monthly_listeners: number;
}

export interface Album {
  id: string;
  title: string;
  artist_id: string;
  artist_name?: string;
  cover_url: string;
  release_date: string;
  type: 'album' | 'single' | 'ep';
  total_tracks: number;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  accent_color: string;
}

export const FALLBACK_GENRES: Genre[] = [
  {
    id: '11111111-1111-1111-1111-111111111101',
    name: 'Synthwave & Retrowave',
    slug: 'synthwave',
    image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    accent_color: '#A855F7',
  },
  {
    id: '11111111-1111-1111-1111-111111111102',
    name: 'Lo-Fi Chill & Beats',
    slug: 'lo-fi',
    image_url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    accent_color: '#8B5CF6',
  },
  {
    id: '11111111-1111-1111-1111-111111111103',
    name: 'Cyberpunk & Electro',
    slug: 'cyberpunk',
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    accent_color: '#EC4899',
  },
  {
    id: '11111111-1111-1111-1111-111111111104',
    name: 'Deep Ambient & Space',
    slug: 'ambient',
    image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    accent_color: '#6366F1',
  },
  {
    id: '11111111-1111-1111-1111-111111111105',
    name: 'Indie Melodic Rock',
    slug: 'indie',
    image_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
    accent_color: '#10B981',
  },
  {
    id: '11111111-1111-1111-1111-111111111106',
    name: 'Acoustic & Serene',
    slug: 'acoustic',
    image_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
    accent_color: '#F59E0B',
  },
];

export const FALLBACK_ARTISTS: Artist[] = [
  {
    id: '22222222-2222-2222-2222-222222222201',
    name: 'Neon Mirage',
    bio: 'Pioneer of analog synthesizers and dystopian retro-futuristic soundscapes from Berlin.',
    image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    header_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    monthly_listeners: 1845000,
  },
  {
    id: '22222222-2222-2222-2222-222222222202',
    name: 'Aura Minimal',
    bio: 'Crafting introspective lo-fi textures and warm tape-saturated chords for late night dreaming.',
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    header_url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    monthly_listeners: 920400,
  },
  {
    id: '22222222-2222-2222-2222-222222222203',
    name: 'Solstice Orbit',
    bio: 'Cinematic post-rock and electronic fusion pushing harmonic resonance to cosmic boundaries.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    header_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    monthly_listeners: 1420000,
  },
  {
    id: '22222222-2222-2222-2222-222222222204',
    name: 'Komorebi Sound',
    bio: 'Organic ambient arrangements blending field recordings with gentle piano and harp flourishes.',
    image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    header_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=1200&q=80',
    verified: false,
    monthly_listeners: 580000,
  },
];

export const FALLBACK_ALBUMS: Album[] = [
  {
    id: '33333333-3333-3333-3333-333333333301',
    title: 'Midnight Odyssey',
    artist_id: '22222222-2222-2222-2222-222222222201',
    artist_name: 'Neon Mirage',
    cover_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    release_date: '2026-02-14',
    type: 'album',
    total_tracks: 3,
  },
  {
    id: '33333333-3333-3333-3333-333333333302',
    title: 'Tape Loops & Rain',
    artist_id: '22222222-2222-2222-2222-222222222202',
    artist_name: 'Aura Minimal',
    cover_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    release_date: '2026-05-18',
    type: 'album',
    total_tracks: 2,
  },
  {
    id: '33333333-3333-3333-3333-333333333303',
    title: 'Starlight Singularity',
    artist_id: '22222222-2222-2222-2222-222222222203',
    artist_name: 'Solstice Orbit',
    cover_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
    release_date: '2026-08-01',
    type: 'album',
    total_tracks: 2,
  },
];

export const FALLBACK_SONGS: Song[] = [
  {
    id: '44444444-4444-4444-4444-444444444401',
    title: 'Cybernetic Skyline',
    artist_id: '22222222-2222-2222-2222-222222222201',
    artist_name: 'Neon Mirage',
    album_id: '33333333-3333-3333-3333-333333333301',
    album_title: 'Midnight Odyssey',
    genre_id: '11111111-1111-1111-1111-111111111101',
    genre_name: 'Synthwave & Retrowave',
    duration_seconds: 372,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    lyrics: `[00:15.00] Cruising through the neon haze\n[00:30.00] Electric shadows in purple glaze\n[01:00.00] Speeding through the grid tonight\n[01:30.00] Guided by the violet light\n[02:00.00] GAAN plays the pulse of tomorrow\n[02:30.00] Transcending digital sorrow`,
    plays_count: 452100,
    likes_count: 38200,
    is_explicit: false,
  },
  {
    id: '44444444-4444-4444-4444-444444444402',
    title: 'Neon Highway 86',
    artist_id: '22222222-2222-2222-2222-222222222201',
    artist_name: 'Neon Mirage',
    album_id: '33333333-3333-3333-3333-333333333301',
    album_title: 'Midnight Odyssey',
    genre_id: '11111111-1111-1111-1111-111111111101',
    genre_name: 'Synthwave & Retrowave',
    duration_seconds: 423,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    lyrics: `[00:20.00] Midnight highway stretches on\n[00:45.00] Chasing the horizon until the dawn\n[01:25.00] Synthetic resonance fills the air\n[02:10.00] Drifting freely without a care`,
    plays_count: 320140,
    likes_count: 24150,
    is_explicit: false,
  },
  {
    id: '44444444-4444-4444-4444-444444444403',
    title: 'Midnight Echoes',
    artist_id: '22222222-2222-2222-2222-222222222201',
    artist_name: 'Neon Mirage',
    album_id: '33333333-3333-3333-3333-333333333301',
    album_title: 'Midnight Odyssey',
    genre_id: '11111111-1111-1111-1111-111111111101',
    genre_name: 'Synthwave & Retrowave',
    duration_seconds: 348,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    lyrics: `[00:10.00] Lost in the reverberation\n[00:40.00] A subterranean sensation\n[01:15.00] Basslines pulsing in dark AMOLED\n[01:50.00] Every memory softly unsaid`,
    plays_count: 198300,
    likes_count: 16500,
    is_explicit: false,
  },
  {
    id: '44444444-4444-4444-4444-444444444404',
    title: 'Late Night Study Session',
    artist_id: '22222222-2222-2222-2222-222222222202',
    artist_name: 'Aura Minimal',
    album_id: '33333333-3333-3333-3333-333333333302',
    album_title: 'Tape Loops & Rain',
    genre_id: '11111111-1111-1111-1111-111111111102',
    genre_name: 'Lo-Fi Chill & Beats',
    duration_seconds: 302,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    cover_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    lyrics: `[Instrumental Lo-Fi Chill Beats]`,
    plays_count: 612400,
    likes_count: 52400,
    is_explicit: false,
  },
  {
    id: '44444444-4444-4444-4444-444444444405',
    title: 'Coffee in the Rain',
    artist_id: '22222222-2222-2222-2222-222222222202',
    artist_name: 'Aura Minimal',
    album_id: '33333333-3333-3333-3333-333333333302',
    album_title: 'Tape Loops & Rain',
    genre_id: '11111111-1111-1111-1111-111111111102',
    genre_name: 'Lo-Fi Chill & Beats',
    duration_seconds: 284,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    cover_url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    lyrics: `[Cozy Lo-Fi Rain Instrumental]`,
    plays_count: 490200,
    likes_count: 41100,
    is_explicit: false,
  },
  {
    id: '44444444-4444-4444-4444-444444444406',
    title: 'Cosmic Aurora',
    artist_id: '22222222-2222-2222-2222-222222222203',
    artist_name: 'Solstice Orbit',
    album_id: '33333333-3333-3333-3333-333333333303',
    album_title: 'Starlight Singularity',
    genre_id: '11111111-1111-1111-1111-111111111104',
    genre_name: 'Deep Ambient & Space',
    duration_seconds: 395,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    cover_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
    lyrics: `[00:25.00] Across the interstellar dust\n[00:55.00] In starry constellations we trust\n[01:40.00] Floating above gravitational tides\n[02:20.00] The cosmic symphony abides`,
    plays_count: 284300,
    likes_count: 21800,
    is_explicit: false,
  },
  {
    id: '44444444-4444-4444-4444-444444444407',
    title: 'Solar Flare Groove',
    artist_id: '22222222-2222-2222-2222-222222222203',
    artist_name: 'Solstice Orbit',
    album_id: '33333333-3333-3333-3333-333333333303',
    album_title: 'Starlight Singularity',
    genre_id: '11111111-1111-1111-1111-111111111103',
    genre_name: 'Cyberpunk & Electro',
    duration_seconds: 360,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    lyrics: `[00:15.00] Ignition sparks the sound machine\n[00:45.00] The wildest rhythm you have seen\n[01:30.00] Feel the heat ignite your soul\n[02:00.00] Electric cadence takes control`,
    plays_count: 175200,
    likes_count: 14300,
    is_explicit: false,
  },
  {
    id: '44444444-4444-4444-4444-444444444408',
    title: 'Whispering Pines',
    artist_id: '22222222-2222-2222-2222-222222222204',
    artist_name: 'Komorebi Sound',
    album_id: undefined,
    album_title: undefined,
    genre_id: '11111111-1111-1111-1111-111111111106',
    genre_name: 'Acoustic & Serene',
    duration_seconds: 315,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
    lyrics: `[Acoustic Forest Ambient Instrumental]`,
    plays_count: 128900,
    likes_count: 11200,
    is_explicit: false,
  },
];
