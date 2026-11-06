'use client';

import React from 'react';
import { usePlayer } from './PlayerContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  ListMusic,
} from 'lucide-react';

const formatTime = (secs: number) => {
  if (isNaN(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export const MiniPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeatMode,
    likedSongIds,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    setFullPlayerOpen,
    toggleLike,
  } = usePlayer();

  if (!currentSong) return null;

  const isLiked = likedSongIds.has(currentSong.id);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#000000] border-t border-[#1a1a24] z-40 px-4 md:px-6 flex items-center justify-between select-none shadow-2xl">
      {/* Top micro progress bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-900 cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = clickX / rect.width;
          seek(ratio * duration);
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 relative transition-all"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Track Info (Left) */}
      <div className="flex items-center gap-3 w-1/4 min-w-[200px]">
        <div
          onClick={() => setFullPlayerOpen(true)}
          className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 cursor-pointer group shadow-md shrink-0"
        >
          <img
            src={currentSong.cover_url}
            alt={currentSong.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            onClick={() => setFullPlayerOpen(true)}
            className="text-sm font-semibold text-white truncate cursor-pointer hover:underline hover:text-purple-300 transition-colors"
          >
            {currentSong.title}
          </div>
          <div className="text-xs text-zinc-400 truncate hover:text-zinc-300 transition-colors">
            {currentSong.artist_name}
          </div>
        </div>

        <button
          onClick={() => toggleLike(currentSong.id)}
          className="p-1.5 text-zinc-400 hover:text-pink-500 transition-colors shrink-0 ml-1"
          title={isLiked ? 'Remove from Liked' : 'Save to Liked'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
        </button>
      </div>

      {/* Main Playback Controls & Scrubber (Center) */}
      <div className="flex flex-col items-center justify-center max-w-xl w-2/4 px-4">
        <div className="flex items-center gap-5 mb-1.5">
          <button
            onClick={toggleShuffle}
            className={`p-1.5 transition-colors ${
              shuffle ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title={`Shuffle ${shuffle ? 'On' : 'Off'}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={prevTrack}
            className="p-1.5 text-zinc-300 hover:text-white transition-colors"
            title="Previous track"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-purple-glow transition-all"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-1.5 text-zinc-300 hover:text-white transition-colors"
            title="Next track"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={cycleRepeat}
            className={`p-1.5 transition-colors ${
              repeatMode !== 'off' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
          </button>
        </div>

        {/* Time slider */}
        <div className="w-full flex items-center gap-2 text-[11px] text-zinc-400">
          <span className="w-9 text-right font-mono">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-fuchsia-400"
          />
          <span className="w-9 font-mono">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Auxiliary Controls (Right: Volume & Fullscreen) */}
      <div className="flex items-center justify-end gap-3 w-1/4">
        <div className="flex items-center gap-2 hidden sm:flex">
          <button
            onClick={toggleMute}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <button
          onClick={() => setFullPlayerOpen(true)}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
          title="Open Full Player"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
