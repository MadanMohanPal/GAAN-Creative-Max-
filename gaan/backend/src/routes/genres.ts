import { Router, Request, Response } from 'express';
import { FALLBACK_GENRES } from '../catalogueData';

const router = Router();

// GET /api/genres
router.get('/', (req: Request, res: Response) => {
  return res.json({ success: true, count: FALLBACK_GENRES.length, data: FALLBACK_GENRES });
});

export default router;
