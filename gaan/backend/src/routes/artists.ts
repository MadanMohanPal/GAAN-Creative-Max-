import { Router, Request, Response } from 'express';
import { getSupabaseClient } from '../supabase';
import { FALLBACK_ARTISTS, FALLBACK_SONGS, FALLBACK_ALBUMS } from '../catalogueData';

const router = Router();

// GET /api/artists
router.get('/', async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('artists').select('*').order('monthly_listeners', { ascending: false });
      if (!error && data && data.length > 0) {
        return res.json({ success: true, count: data.length, data });
      }
    }
    return res.json({ success: true, count: FALLBACK_ARTISTS.length, data: FALLBACK_ARTISTS });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/artists/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artist = FALLBACK_ARTISTS.find(a => a.id === id);
    if (!artist) {
      return res.status(404).json({ success: false, error: 'Artist not found' });
    }

    const songs = FALLBACK_SONGS.filter(s => s.artist_id === id);
    const albums = FALLBACK_ALBUMS.filter(a => a.artist_id === id);

    return res.json({
      success: true,
      data: {
        ...artist,
        top_songs: songs,
        albums,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
