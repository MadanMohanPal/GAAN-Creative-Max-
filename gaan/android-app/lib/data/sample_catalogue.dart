import '../models/song.dart';

class SampleCatalogue {
  static const List<Genre> genres = [
    Genre(
      id: '11111111-1111-1111-1111-111111111101',
      name: 'Synthwave',
      slug: 'synthwave',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFFA855F7,
    ),
    Genre(
      id: '11111111-1111-1111-1111-111111111102',
      name: 'Lo-Fi Chill',
      slug: 'lo-fi',
      imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFF8B5CF6,
    ),
    Genre(
      id: '11111111-1111-1111-1111-111111111103',
      name: 'Cyberpunk Electro',
      slug: 'cyberpunk',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFFEC4899,
    ),
    Genre(
      id: '11111111-1111-1111-1111-111111111104',
      name: 'Deep Ambient',
      slug: 'ambient',
      imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFF6366F1,
    ),
    Genre(
      id: '11111111-1111-1111-1111-111111111105',
      name: 'Indie Rock',
      slug: 'indie',
      imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFF10B981,
    ),
    Genre(
      id: '11111111-1111-1111-1111-111111111106',
      name: 'Acoustic Serene',
      slug: 'acoustic',
      imageUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFFF59E0B,
    ),
  ];

  static const List<Artist> artists = [
    Artist(
      id: '22222222-2222-2222-2222-222222222201',
      name: 'Neon Mirage',
      bio: 'Pioneer of analog synthesizers and dystopian retro-futuristic soundscapes.',
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      headerUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      verified: true,
      monthlyListeners: 1845000,
    ),
    Artist(
      id: '22222222-2222-2222-2222-222222222202',
      name: 'Aura Minimal',
      bio: 'Crafting introspective lo-fi textures and warm tape-saturated chords.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      headerUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
      verified: true,
      monthlyListeners: 920400,
    ),
    Artist(
      id: '22222222-2222-2222-2222-222222222203',
      name: 'Solstice Orbit',
      bio: 'Cinematic post-rock and electronic fusion pushing harmonic resonance.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      headerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      verified: true,
      monthlyListeners: 1420000,
    ),
    Artist(
      id: '22222222-2222-2222-2222-222222222204',
      name: 'Komorebi Sound',
      bio: 'Organic ambient arrangements blending field recordings with gentle piano.',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      headerUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=1200&q=80',
      verified: false,
      monthlyListeners: 580000,
    ),
  ];

  static const List<Album> albums = [
    Album(
      id: '33333333-3333-3333-3333-333333333301',
      title: 'Midnight Odyssey',
      artistId: '22222222-2222-2222-2222-222222222201',
      artistName: 'Neon Mirage',
      coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      releaseDate: '2026-02-14',
      type: 'album',
      totalTracks: 3,
    ),
    Album(
      id: '33333333-3333-3333-3333-333333333302',
      title: 'Tape Loops & Rain',
      artistId: '22222222-2222-2222-2222-222222222202',
      artistName: 'Aura Minimal',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      releaseDate: '2026-05-18',
      type: 'album',
      totalTracks: 2,
    ),
    Album(
      id: '33333333-3333-3333-3333-333333333303',
      title: 'Starlight Singularity',
      artistId: '22222222-2222-2222-2222-222222222203',
      artistName: 'Solstice Orbit',
      coverUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
      releaseDate: '2026-08-01',
      type: 'album',
      totalTracks: 2,
    ),
  ];

  static const List<Song> songs = [
    Song(
      id: '44444444-4444-4444-4444-444444444401',
      title: 'Cybernetic Skyline',
      artistId: '22222222-2222-2222-2222-222222222201',
      artistName: 'Neon Mirage',
      albumId: '33333333-3333-3333-3333-333333333301',
      albumTitle: 'Midnight Odyssey',
      genreId: '11111111-1111-1111-1111-111111111101',
      genreName: 'Synthwave',
      durationSeconds: 372,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      lyrics: '''[00:15.00] Cruising through the neon haze
[00:30.00] Electric shadows in purple glaze
[01:00.00] Speeding through the grid tonight
[01:30.00] Guided by the violet light
[02:00.00] GAAN plays the pulse of tomorrow
[02:30.00] Transcending digital sorrow''',
      playsCount: 452100,
      likesCount: 38200,
    ),
    Song(
      id: '44444444-4444-4444-4444-444444444402',
      title: 'Neon Highway 86',
      artistId: '22222222-2222-2222-2222-222222222201',
      artistName: 'Neon Mirage',
      albumId: '33333333-3333-3333-3333-333333333301',
      albumTitle: 'Midnight Odyssey',
      genreId: '11111111-1111-1111-1111-111111111101',
      genreName: 'Synthwave',
      durationSeconds: 423,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      lyrics: '''[00:20.00] Midnight highway stretches on
[00:45.00] Chasing the horizon until the dawn
[01:25.00] Synthetic resonance fills the air
[02:10.00] Drifting freely without a care''',
      playsCount: 320140,
      likesCount: 24150,
    ),
    Song(
      id: '44444444-4444-4444-4444-444444444403',
      title: 'Midnight Echoes',
      artistId: '22222222-2222-2222-2222-222222222201',
      artistName: 'Neon Mirage',
      albumId: '33333333-3333-3333-3333-333333333301',
      albumTitle: 'Midnight Odyssey',
      genreId: '11111111-1111-1111-1111-111111111101',
      genreName: 'Synthwave',
      durationSeconds: 348,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      lyrics: '''[00:10.00] Lost in the reverberation
[00:40.00] A subterranean sensation
[01:15.00] Basslines pulsing in dark AMOLED
[01:50.00] Every memory softly unsaid''',
      playsCount: 198300,
      likesCount: 16500,
    ),
    Song(
      id: '44444444-4444-4444-4444-444444444404',
      title: 'Late Night Study Session',
      artistId: '22222222-2222-2222-2222-222222222202',
      artistName: 'Aura Minimal',
      albumId: '33333333-3333-3333-3333-333333333302',
      albumTitle: 'Tape Loops & Rain',
      genreId: '11111111-1111-1111-1111-111111111102',
      genreName: 'Lo-Fi Chill',
      durationSeconds: 302,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      lyrics: '[Instrumental Lo-Fi Chill Beats]',
      playsCount: 612400,
      likesCount: 52400,
    ),
    Song(
      id: '44444444-4444-4444-4444-444444444405',
      title: 'Coffee in the Rain',
      artistId: '22222222-2222-2222-2222-222222222202',
      artistName: 'Aura Minimal',
      albumId: '33333333-3333-3333-3333-333333333302',
      albumTitle: 'Tape Loops & Rain',
      genreId: '11111111-1111-1111-1111-111111111102',
      genreName: 'Lo-Fi Chill',
      durationSeconds: 284,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
      lyrics: '[Cozy Lo-Fi Rain Instrumental]',
      playsCount: 490200,
      likesCount: 41100,
    ),
    Song(
      id: '44444444-4444-4444-4444-444444444406',
      title: 'Cosmic Aurora',
      artistId: '22222222-2222-2222-2222-222222222203',
      artistName: 'Solstice Orbit',
      albumId: '33333333-3333-3333-3333-333333333303',
      albumTitle: 'Starlight Singularity',
      genreId: '11111111-1111-1111-1111-111111111104',
      genreName: 'Deep Ambient',
      durationSeconds: 395,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
      lyrics: '''[00:25.00] Across the interstellar dust
[00:55.00] In starry constellations we trust
[01:40.00] Floating above gravitational tides
[02:20.00] The cosmic symphony abides''',
      playsCount: 284300,
      likesCount: 21800,
    ),
    Song(
      id: '44444444-4444-4444-4444-444444444407',
      title: 'Solar Flare Groove',
      artistId: '22222222-2222-2222-2222-222222222203',
      artistName: 'Solstice Orbit',
      albumId: '33333333-3333-3333-3333-333333333303',
      albumTitle: 'Starlight Singularity',
      genreId: '11111111-1111-1111-1111-111111111103',
      genreName: 'Cyberpunk Electro',
      durationSeconds: 360,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
      lyrics: '''[00:15.00] Ignition sparks the sound machine
[00:45.00] The wildest rhythm you have seen
[01:30.00] Feel the heat ignite your soul
[02:00.00] Electric cadence takes control''',
      playsCount: 175200,
      likesCount: 14300,
    ),
    Song(
      id: '44444444-4444-4444-4444-444444444408',
      title: 'Whispering Pines',
      artistId: '22222222-2222-2222-2222-222222222204',
      artistName: 'Komorebi Sound',
      genreId: '11111111-1111-1111-1111-111111111106',
      genreName: 'Acoustic Serene',
      durationSeconds: 315,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
      lyrics: '[Acoustic Forest Ambient Instrumental]',
      playsCount: 128900,
      likesCount: 11200,
    ),
  ];
}
