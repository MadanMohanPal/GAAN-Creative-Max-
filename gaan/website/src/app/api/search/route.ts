import { NextRequest, NextResponse } from 'next/server';
import { searchGlobalMusic } from '@/lib/globalSearch';
import { SONGS } from '@/lib/catalogue';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) {
    return NextResponse.json(
      {
        songs: SONGS,
        relatedSongs: SONGS.slice(0, 6),
        artists: [],
        albums: [],
      },
      { headers: corsHeaders }
    );
  }

  // 1. Search local curated catalogue
  const cleanQ = q.toLowerCase().trim();
  const localMatches = SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(cleanQ) ||
      s.artist_name.toLowerCase().includes(cleanQ) ||
      s.genre_name?.toLowerCase().includes(cleanQ) ||
      s.album_title?.toLowerCase().includes(cleanQ)
  );

  // 2. Fetch worldwide full-length results from JioSaavn Decryption Engine
  const globalResults = await searchGlobalMusic(q);

  // Combine results (avoid duplicate titles)
  const existingTitles = new Set(localMatches.map((s) => s.title.toLowerCase()));
  const combinedSongs = [
    ...localMatches,
    ...globalResults.songs.filter((s) => !existingTitles.has(s.title.toLowerCase())),
  ];

  // 3. Smart Mood & Related Songs Suggestion
  const topResult = combinedSongs[0];
  const relatedSongs = SONGS.filter((s) => {
    if (!topResult) return false;
    if (s.id === topResult.id) return false;
    return (
      s.artist_name.toLowerCase().includes(topResult.artist_name.split(',')[0].trim().toLowerCase()) ||
      s.language === topResult.language ||
      s.genre_name === topResult.genre_name
    );
  }).slice(0, 6);

  return NextResponse.json(
    {
      songs: combinedSongs,
      relatedSongs: relatedSongs.length > 0 ? relatedSongs : SONGS.slice(0, 5),
      artists: globalResults.artists,
      albums: globalResults.albums,
      query: q,
    },
    { headers: corsHeaders }
  );
}
