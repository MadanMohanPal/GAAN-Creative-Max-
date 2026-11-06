export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  is_premium: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  accent_color: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  header_url?: string;
  verified: boolean;
  monthly_listeners: number;
}

export interface Album {
  id: string;
  title: string;
  artist_id: string;
  artist_name?: string;
  cover_url: string;
  release_date: string;
  type: 'album' | 'single' | 'ep';
  total_tracks: number;
}

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  album_id?: string;
  album_title?: string;
  genre_id?: string;
  genre_name?: string;
  duration_seconds: number;
  audio_url: string;
  cover_url: string;
  lyrics?: string;
  plays_count: number;
  likes_count: number;
  is_explicit: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  cover_url?: string;
  user_id: string;
  is_public: boolean;
  songs?: Song[];
  song_count?: number;
}

export interface ListeningHistoryEntry {
  id: string;
  user_id: string;
  song_id: string;
  played_at: string;
  playback_seconds: number;
  completed: boolean;
  song?: Song;
}

export interface UserPreferences {
  theme: 'amoled-dark' | 'midnight' | 'purple-dark';
  audio_quality: 'auto' | 'normal' | 'high' | 'lossless';
  equalizer_preset: string;
  normalize_volume: boolean;
  autoplay_recommended: boolean;
  offline_downloads_quality: string;
}

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeatMode: RepeatMode;
  queue: Song[];
  queueIndex: number;
}
