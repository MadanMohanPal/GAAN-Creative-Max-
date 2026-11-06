'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Song, SONGS } from '@/lib/catalogue';

export type RepeatMode = 'off' | 'all' | 'one';

interface PlayerContextType {
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
  isFullPlayerOpen: boolean;
  likedSongIds: Set<string>;
  playSong: (song: Song, customQueue?: Song[]) => void;
  togglePlay: () => void;
  pauseSong: () => void;
  resumeSong: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setFullPlayerOpen: (open: boolean) => void;
  toggleLike: (songId: string) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] = useState<Song | null>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(SONGS[0].duration_seconds);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [queue, setQueue] = useState<Song[]>(SONGS);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [isFullPlayerOpen, setFullPlayerOpen] = useState<boolean>(false);
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(new Set([SONGS[0].id, SONGS[3].id]));

  // Initialize HTMLAudioElement
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Update MediaSession controls for web background/lockscreen media player
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist_name,
        album: currentSong.album_title || 'GAAN Music',
        artwork: [
          { src: currentSong.cover_url, sizes: '512x512', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => resumeSong());
      navigator.mediaSession.setActionHandler('pause', () => pauseSong());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) seek(details.seekTime);
      });
    }
  }, [currentSong]);

  // Audio track end handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [repeatMode, queueIndex, queue, shuffle]);

  const playSong = (song: Song, customQueue?: Song[]) => {
    const newQueue = customQueue || (queue.length > 0 ? queue : SONGS);
    const idx = newQueue.findIndex(s => s.id === song.id);

    setCurrentSong(song);
    setQueue(newQueue);
    setQueueIndex(idx >= 0 ? idx : 0);

    if (audioRef.current) {
      audioRef.current.src = song.audio_url;
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
        console.warn('Audio auto-play note (user interaction required):', e);
      });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (!audio.src && currentSong) {
        audio.src = currentSong.audio_url;
      }
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeSong = () => {
    if (audioRef.current) {
      if (!audioRef.current.src && currentSong) {
        audioRef.current.src = currentSong.audio_url;
      }
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (queue.length === 0) return;

    let nextIdx = 0;
    if (shuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else {
      nextIdx = queueIndex + 1;
      if (nextIdx >= queue.length) {
        if (repeatMode === 'all') nextIdx = 0;
        else return; // Stop at end of queue
      }
    }

    const nextSong = queue[nextIdx];
    setQueueIndex(nextIdx);
    setCurrentSong(nextSong);

    if (audioRef.current) {
      audioRef.current.src = nextSong.audio_url;
      audioRef.current.play().catch(console.error);
    }
  };

  const prevTrack = () => {
    if (queue.length === 0) return;
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const prevIdx = queueIndex - 1 < 0 ? queue.length - 1 : queueIndex - 1;
    const prevSong = queue[prevIdx];
    setQueueIndex(prevIdx);
    setCurrentSong(prevSong);

    if (audioRef.current) {
      audioRef.current.src = prevSong.audio_url;
      audioRef.current.play().catch(console.error);
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      if (clamped > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const toggleShuffle = () => setShuffle(prev => !prev);

  const cycleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const toggleLike = (songId: string) => {
    setLikedSongIds(prev => {
      const next = new Set(prev);
      if (next.has(songId)) next.delete(songId);
      else next.add(songId);
      return next;
    });
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        shuffle,
        repeatMode,
        queue,
        queueIndex,
        isFullPlayerOpen,
        likedSongIds,
        playSong,
        togglePlay,
        pauseSong,
        resumeSong,
        nextTrack,
        prevTrack,
        seek,
        setVolume,
        toggleMute,
        toggleShuffle,
        cycleRepeat,
        setFullPlayerOpen,
        toggleLike,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within PlayerProvider');
  return context;
};
