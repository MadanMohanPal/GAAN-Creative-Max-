import { Router, Request, Response } from 'express';
import { FALLBACK_ALBUMS, FALLBACK_SONGS } from '../catalogueData';

const router = Router();

// GET /api/albums
router.get('/', (req: Request, res: Response) => {
  return res.json({ success: true, count: FALLBACK_ALBUMS.length, data: FALLBACK_ALBUMS });
});

// GET /api/albums/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const album = FALLBACK_ALBUMS.find(a => a.id === id);
  if (!album) {
    return res.status(404).json({ success: false, error: 'Album not found' });
  }
  const songs = FALLBACK_SONGS.filter(s => s.album_id === id);
  return res.json({ success: true, data: { ...album, songs } });
});

export default router;
