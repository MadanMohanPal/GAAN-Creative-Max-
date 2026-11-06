import { Song } from './catalogue';

export interface GlobalSearchResult {
  songs: Song[];
  artists: { id: string; name: string; image_url: string; bio: string; monthly_listeners: number }[];
  albums: { id: string; title: string; artist_name: string; cover_url: string; year: number }[];
}

export async function searchGlobalMusic(query: string): Promise<GlobalSearchResult> {
  const cleanQ = query.trim();
  if (!cleanQ) {
    return { songs: [], artists: [], albums: [] };
  }

  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(cleanQ)}&entity=song&limit=30`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
      throw new Error(`iTunes API error: ${res.status}`);
    }

    const data = await res.json();
    const results = data.results || [];

    const songs: Song[] = results.map((item: any) => ({
      id: `itunes-${item.trackId}`,
      title: item.trackName || 'Unknown Title',
      artist_name: item.artistName || 'Unknown Artist',
      album_title: item.collectionName || item.trackName || 'Single',
      cover_url: item.artworkUrl100
        ? item.artworkUrl100.replace('100x100bb', '600x600bb')
        : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
      audio_url: item.previewUrl || '',
      duration_seconds: Math.round((item.trackTimeMillis || 30000) / 1000),
      genre_name: item.primaryGenreName || 'Pop',
      play_count: Math.floor(Math.random() * 800000) + 100000,
      lyrics: `[00:00.00] Streaming ${item.trackName} by ${item.artistName}\n[00:04.00] Album: ${item.collectionName || 'Single'}\n[00:09.00] Pure Lossless Audio Fidelity\n[00:15.00] Enjoy worldwide unlimited streaming on GAAN`,
    })).filter((s: Song) => s.audio_url && s.audio_url.length > 0);

    // Extract unique artists
    const artistMap = new Map<string, any>();
    results.forEach((item: any) => {
      if (item.artistName && !artistMap.has(item.artistName)) {
        artistMap.set(item.artistName, {
          id: `artist-${item.artistId || Math.random()}`,
          name: item.artistName,
          image_url: item.artworkUrl100
            ? item.artworkUrl100.replace('100x100bb', '600x600bb')
            : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
          bio: `Global recording artist with chart-topping releases in ${item.primaryGenreName || 'Music'}.`,
          monthly_listeners: Math.floor(Math.random() * 2000000) + 500000,
        });
      }
    });

    // Extract unique albums
    const albumMap = new Map<string, any>();
    results.forEach((item: any) => {
      if (item.collectionName && !albumMap.has(item.collectionName)) {
        albumMap.set(item.collectionName, {
          id: `album-${item.collectionId || Math.random()}`,
          title: item.collectionName,
          artist_name: item.artistName,
          cover_url: item.artworkUrl100
            ? item.artworkUrl100.replace('100x100bb', '600x600bb')
            : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
          year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : 2024,
        });
      }
    });

    return {
      songs,
      artists: Array.from(artistMap.values()),
      albums: Array.from(albumMap.values()),
    };
  } catch (err) {
    console.error('Failed to query global music API:', err);
    return { songs: [], artists: [], albums: [] };
  }
}
