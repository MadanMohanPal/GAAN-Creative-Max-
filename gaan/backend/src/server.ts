import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songsRouter from './routes/songs';
import artistsRouter from './routes/artists';
import albumsRouter from './routes/albums';
import genresRouter from './routes/genres';
import exploreRouter from './routes/explore';
import searchRouter from './routes/search';
import { isSupabaseConfigured } from './supabase';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security & Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-info', 'apikey'],
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    platform: 'GAAN Music Streaming Ecosystem Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    supabaseConnected: isSupabaseConfigured(),
  });
});

// API Routes
app.use('/api/songs', songsRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/genres', genresRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/search', searchRouter);

// Playback session history endpoint
app.post('/api/history', (req: Request, res: Response) => {
  const { songId, playbackSeconds, completed } = req.body;
  console.log(`[Playback Logged] Song: ${songId}, Duration: ${playbackSeconds}s, Finished: ${completed}`);
  res.json({ success: true, message: 'Playback recorded' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.originalUrl });
});

export const server = app.listen(PORT, () => {
  console.log(`🎵 GAAN Backend Server listening on http://localhost:${PORT}`);
  console.log(`🚀 Health Check: http://localhost:${PORT}/health`);
  console.log(`🎶 Catalogue API: http://localhost:${PORT}/api/songs`);
});

export default app;
