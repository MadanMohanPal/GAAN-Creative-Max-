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
  history: Song[];
  downloadedSongs: Song[];
  // Dynamic Audio & Studio Controls
  playbackSpeed: number;
  equalizerPreset: string;
  bassBoost: number;
  virtualizer: boolean;
  sleepTimerMinutes: number | null;
  sleepSecondsRemaining: number;
  // Actions
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
  downloadSong: (song: Song) => Promise<void>;
  removeDownloadedSong: (songId: string) => void;
  setPlaybackSpeed: (speed: number) => void;
  setEqualizerPreset: (preset: string) => void;
  setBassBoost: (val: number) => void;
  setVirtualizer: (val: boolean) => void;
  setSleepTimer: (minutes: number) => void;
  cancelSleepTimer: () => void;
  reorderQueue: (oldIdx: number, newIdx: number) => void;
  removeFromQueue: (index: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);

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
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(new Set([SONGS[0].id, SONGS[1].id, SONGS[2].id]));
  const [history, setHistory] = useState<Song[]>([]);
  const [downloadedSongs, setDownloadedSongs] = useState<Song[]>([]);

  // Dynamic Audio Controls
  const [playbackSpeed, setPlaybackSpeedState] = useState<number>(1.0);
  const [equalizerPreset, setEqualizerPresetState] = useState<string>('Studio Master');
  const [bassBoost, setBassBoost] = useState<number>(80);
  const [virtualizer, setVirtualizer] = useState<boolean>(true);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepSecondsRemaining, setSleepSecondsRemaining] = useState<number>(0);

  // Load persistence from localStorage
  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem('gaan_liked_songs');
      if (savedLikes) {
        setLikedSongIds(new Set(JSON.parse(savedLikes)));
      }
      const savedHistory = localStorage.getItem('gaan_listening_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      const savedDownloads = localStorage.getItem('gaan_downloaded_songs');
      if (savedDownloads) {
        setDownloadedSongs(JSON.parse(savedDownloads));
      }
    } catch (e) {}
  }, []);

  // Initialize HTMLAudioElement
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audio.playbackRate = playbackSpeed;
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

  // Sleep Timer countdown engine
  useEffect(() => {
    if (sleepTimerMinutes === null || sleepTimerMinutes <= 0) {
      if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
      return;
    }

    sleepTimerRef.current = setInterval(() => {
      setSleepSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
          setSleepTimerMinutes(null);
          pauseSong();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
    };
  }, [sleepTimerMinutes]);

  // MediaSession controls
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist_name,
        album: currentSong.album_title || 'GAAN Master by Creative Max',
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

  // Handle song ending
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (sleepTimerMinutes === -1) {
        pauseSong();
        cancelSleepTimer();
        return;
      }

      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [repeatMode, queueIndex, queue, shuffle, sleepTimerMinutes]);

  const playSong = (song: Song, customQueue?: Song[]) => {
    const newQueue = customQueue || (queue.length > 0 ? queue : SONGS);
    const idx = newQueue.findIndex(s => s.id === song.id);

    setCurrentSong(song);
    setQueue(newQueue);
    setQueueIndex(idx >= 0 ? idx : 0);

    // Record listening history
    setHistory(prev => {
      const updated = [song, ...prev.filter(s => s.id !== song.id)].slice(0, 30);
      try {
        localStorage.setItem('gaan_listening_history', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (audioRef.current) {
      audioRef.current.src = song.audio_url;
      audioRef.current.playbackRate = playbackSpeed;
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
      audio.playbackRate = playbackSpeed;
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
      audioRef.current.playbackRate = playbackSpeed;
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
        else return;
      }
    }

    const nextSong = queue[nextIdx];
    setQueueIndex(nextIdx);
    setCurrentSong(nextSong);

    if (audioRef.current) {
      audioRef.current.src = nextSong.audio_url;
      audioRef.current.playbackRate = playbackSpeed;
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
      audioRef.current.playbackRate = playbackSpeed;
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
      try {
        localStorage.setItem('gaan_liked_songs', JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  // Dynamic Audio Controls
  const setPlaybackSpeed = (speed: number) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const setEqualizerPreset = (preset: string) => {
    setEqualizerPresetState(preset);
    switch (preset) {
      case 'Bass Boost 🔥':
        setBassBoost(100);
        setVirtualizer(true);
        break;
      case 'Vocal Clarity 🎙️':
        setBassBoost(30);
        setVirtualizer(false);
        break;
      case 'Acoustic / Sufi 🎸':
        setBassBoost(50);
        setVirtualizer(true);
        break;
      case 'Electronic / Dance 🎛️':
        setBassBoost(95);
        setVirtualizer(true);
        break;
      case 'Treble Boost ⚡':
        setBassBoost(40);
        setVirtualizer(true);
        break;
      default:
        setBassBoost(75);
        setVirtualizer(true);
        break;
    }
  };

  const setSleepTimer = (minutes: number) => {
    if (minutes <= 0) {
      cancelSleepTimer();
      return;
    }
    setSleepTimerMinutes(minutes);
    setSleepSecondsRemaining(minutes * 60);
  };

  const cancelSleepTimer = () => {
    if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
    setSleepTimerMinutes(null);
    setSleepSecondsRemaining(0);
  };

  const reorderQueue = (oldIdx: number, newIdx: number) => {
    setQueue(prev => {
      const updated = [...prev];
      const [item] = updated.splice(oldIdx, 1);
      updated.splice(newIdx, 0, item);
      return updated;
    });
  };

  const removeFromQueue = (index: number) => {
    setQueue(prev => prev.filter((_, i) => i !== index));
  };

  // One-click Song Download engine
  const downloadSong = async (song: Song) => {
    const safeTitle = `${song.title} - ${song.artist_name}`;
    const downloadEndpoint = `/api/download?url=${encodeURIComponent(song.audio_url)}&name=${encodeURIComponent(safeTitle)}`;

    // Trigger direct browser download
    const link = document.createElement('a');
    link.href = downloadEndpoint;
    link.download = `${safeTitle}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Save into Downloaded songs list for Offline library
    setDownloadedSongs(prev => {
      if (prev.some(s => s.id === song.id)) return prev;
      const updated = [song, ...prev];
      try {
        localStorage.setItem('gaan_downloaded_songs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const removeDownloadedSong = (songId: string) => {
    setDownloadedSongs(prev => {
      const updated = prev.filter(s => s.id !== songId);
      try {
        localStorage.setItem('gaan_downloaded_songs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
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
        history,
        downloadedSongs,
        playbackSpeed,
        equalizerPreset,
        bassBoost,
        virtualizer,
        sleepTimerMinutes,
        sleepSecondsRemaining,
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
        downloadSong,
        removeDownloadedSong,
        setPlaybackSpeed,
        setEqualizerPreset,
        setBassBoost,
        setVirtualizer,
        setSleepTimer,
        cancelSleepTimer,
        reorderQueue,
        removeFromQueue,
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
