import { NextRequest, NextResponse } from 'next/server';
import { searchGlobalMusic } from '@/lib/globalSearch';
import { SONGS } from '@/lib/catalogue';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) {
    return NextResponse.json({
      songs: SONGS.slice(0, 10),
      artists: [],
      albums: [],
    });
  }

  // 1. Search local curated hits first
  const cleanQ = q.toLowerCase().trim();
  const localMatches = SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(cleanQ) ||
      s.artist_name.toLowerCase().includes(cleanQ) ||
      s.genre_name?.toLowerCase().includes(cleanQ)
  );

  // 2. Fetch worldwide results from iTunes Global Catalog
  const globalResults = await searchGlobalMusic(q);

  // Combine results (avoid duplicate titles)
  const existingIds = new Set(localMatches.map((s) => s.title.toLowerCase()));
  const combinedSongs = [
    ...localMatches,
    ...globalResults.songs.filter((s) => !existingIds.has(s.title.toLowerCase())),
  ];

  return NextResponse.json({
    songs: combinedSongs,
    artists: globalResults.artists,
    albums: globalResults.albums,
  });
}
