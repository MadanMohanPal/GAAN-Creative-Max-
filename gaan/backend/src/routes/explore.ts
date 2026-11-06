import { Router, Request, Response } from 'express';
import { FALLBACK_SONGS, FALLBACK_ALBUMS, FALLBACK_ARTISTS, FALLBACK_GENRES } from '../catalogueData';

const router = Router();

// GET /api/explore
router.get('/', (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      quick_picks: FALLBACK_SONGS.slice(0, 4),
      trending: FALLBACK_SONGS.slice(2, 6),
      listen_again: FALLBACK_SONGS.slice(4, 8),
      featured_albums: FALLBACK_ALBUMS,
      top_artists: FALLBACK_ARTISTS,
      moods_and_genres: FALLBACK_GENRES,
    },
  });
});

export default router;
