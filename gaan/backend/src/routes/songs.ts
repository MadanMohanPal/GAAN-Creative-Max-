import { Router, Request, Response } from 'express';
import { getSupabaseClient } from '../supabase';
import { FALLBACK_SONGS } from '../catalogueData';

const router = Router();

// GET /api/songs
router.get('/', async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { genre, artist, search } = req.query;

    if (supabase) {
      let query = supabase.from('songs').select('*, artists(name), albums(title), genres(name)');
      if (genre) query = query.eq('genre_id', genre);
      if (artist) query = query.eq('artist_id', artist);
      if (search) query = query.ilike('title', `%${search}%`);

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const formatted = data.map((s: any) => ({
          ...s,
          artist_name: s.artists?.name || 'Unknown Artist',
          album_title: s.albums?.title,
          genre_name: s.genres?.name,
        }));
        return res.json({ success: true, count: formatted.length, data: formatted });
      }
    }

    // Fallback catalogue
    let filtered = [...FALLBACK_SONGS];
    if (genre) {
      filtered = filtered.filter(s => s.genre_id === genre || s.genre_name?.toLowerCase().includes(String(genre).toLowerCase()));
    }
    if (artist) {
      filtered = filtered.filter(s => s.artist_id === artist || s.artist_name.toLowerCase().includes(String(artist).toLowerCase()));
    }
    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(s => s.title.toLowerCase().includes(q) || s.artist_name.toLowerCase().includes(q));
    }

    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/songs/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('songs')
        .select('*, artists(name, bio, image_url), albums(title, cover_url)')
        .eq('id', id)
        .single();

      if (!error && data) {
        return res.json({
          success: true,
          data: {
            ...data,
            artist_name: data.artists?.name,
            album_title: data.albums?.title,
          },
        });
      }
    }

    const song = FALLBACK_SONGS.find(s => s.id === id);
    if (!song) {
      return res.status(404).json({ success: false, error: 'Song not found' });
    }
    return res.json({ success: true, data: song });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
