import { Router, Request, Response } from 'express';
import { FALLBACK_SONGS, FALLBACK_ARTISTS, FALLBACK_ALBUMS } from '../catalogueData';

const router = Router();

// GET /api/search?q=...
router.get('/', (req: Request, res: Response) => {
  const query = (req.query.q as string || '').toLowerCase().trim();

  if (!query) {
    return res.json({
      success: true,
      data: {
        songs: FALLBACK_SONGS.slice(0, 5),
        artists: FALLBACK_ARTISTS,
        albums: FALLBACK_ALBUMS,
      },
    });
  }

  const songs = FALLBACK_SONGS.filter(s =>
    s.title.toLowerCase().includes(query) ||
    s.artist_name.toLowerCase().includes(query) ||
    s.genre_name?.toLowerCase().includes(query)
  );

  const artists = FALLBACK_ARTISTS.filter(a =>
    a.name.toLowerCase().includes(query) ||
    a.bio.toLowerCase().includes(query)
  );

  const albums = FALLBACK_ALBUMS.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.artist_name?.toLowerCase().includes(query)
  );

  return res.json({
    success: true,
    query,
    data: {
      songs,
      artists,
      albums,
    },
  });
});

export default router;
