'use client';

import React, { useState } from 'react';
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
  Sliders,
  Moon,
  Zap,
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
    playbackSpeed,
    equalizerPreset,
    sleepTimerMinutes,
    sleepSecondsRemaining,
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
    setPlaybackSpeed,
  } = usePlayer();

  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  if (!currentSong) return null;

  const isLiked = likedSongIds.has(currentSong.id);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#09090f] border-t border-[#1f1f2e] z-40 px-4 md:px-6 flex items-center justify-between select-none shadow-2xl backdrop-blur-lg">
      {/* Top micro progress bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-zinc-900 cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = clickX / rect.width;
          seek(ratio * duration);
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 relative transition-all"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md shadow-purple-500/50" />
        </div>
      </div>

      {/* Track Info (Left) */}
      <div className="flex items-center gap-3 w-1/4 min-w-[220px]">
        <div
          onClick={() => setFullPlayerOpen(true)}
          className={`relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 cursor-pointer group shadow-md shrink-0 border ${
            isPlaying ? 'border-purple-500/60 shadow-purple-900/30' : 'border-zinc-800'
          }`}
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
          <div className="flex items-center gap-2">
            <div
              onClick={() => setFullPlayerOpen(true)}
              className="text-sm font-semibold text-white truncate cursor-pointer hover:underline hover:text-purple-300 transition-colors"
            >
              {currentSong.title}
            </div>

            {/* Dancing Equalizer Bars when Playing */}
            {isPlaying && (
              <div className="flex items-end gap-[2px] h-3 shrink-0">
                <span className="w-[2.5px] bg-purple-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-2.5" />
                <span className="w-[2.5px] bg-pink-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_0.1s] h-3" />
                <span className="w-[2.5px] bg-fuchsia-400 rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.2s] h-2" />
                <span className="w-[2.5px] bg-purple-300 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.15s] h-3" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <div className="text-xs text-zinc-400 truncate hover:text-zinc-300 transition-colors">
              {currentSong.artist_name}
            </div>
            <span className="text-[10px] text-purple-400/80 bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-800/30 shrink-0 font-medium">
              {equalizerPreset.split(' ')[0]}
            </span>
          </div>
        </div>

        <button
          onClick={() => toggleLike(currentSong.id)}
          className={`p-1.5 rounded-full hover:bg-zinc-800/60 transition-colors shrink-0 ${
            isLiked ? 'text-pink-500' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title={isLiked ? 'Unlike' : 'Like'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500' : ''}`} />
        </button>
      </div>

      {/* Player Main Controls (Center) */}
      <div className="flex flex-col items-center gap-1 max-w-[45%] w-full">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleShuffle}
            className={`p-1.5 rounded-full transition-colors ${
              shuffle ? 'text-purple-400 hover:text-purple-300' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title={shuffle ? 'Shuffle On' : 'Shuffle Off'}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={prevTrack}
            className="p-1.5 text-zinc-300 hover:text-white transition-colors"
            title="Previous"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 transition-transform active:scale-95"
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
            title="Next"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={cycleRepeat}
            className={`p-1.5 rounded-full transition-colors ${
              repeatMode !== 'off'
                ? 'text-purple-400 hover:text-purple-300'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
          </button>
        </div>

        {/* Time Progress */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-400">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Quick Tools & Volume (Right) */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[200px]">
        {/* Sleep Timer Indicator if active */}
        {sleepTimerMinutes !== null && (
          <div
            onClick={() => setFullPlayerOpen(true)}
            className="cursor-pointer flex items-center gap-1 text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/50 px-2 py-1 rounded-full"
            title="Sleep timer active"
          >
            <Moon className="w-3 h-3 text-purple-400 animate-pulse" />
            <span>{Math.floor(sleepSecondsRemaining / 60)}m</span>
          </div>
        )}

        {/* Speed Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className={`px-2 py-1 rounded-md text-xs font-semibold border transition-colors ${
              playbackSpeed !== 1.0
                ? 'bg-purple-900/40 border-purple-600 text-purple-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>

          {showSpeedMenu && (
            <div className="absolute bottom-10 right-0 bg-[#12121a] border border-zinc-800 rounded-lg shadow-xl py-1 w-24 z-50">
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setPlaybackSpeed(s);
                    setShowSpeedMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                    playbackSpeed === s
                      ? 'text-purple-400 font-bold bg-purple-950/40'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{s}x</span>
                  {playbackSpeed === s && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Studio Sound FX Pill */}
        <button
          onClick={() => setFullPlayerOpen(true)}
          className="p-2 text-zinc-400 hover:text-purple-300 rounded-full hover:bg-zinc-900 transition-colors"
          title="Studio Equalizer & FX"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Volume Slider */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Full Screen Player Expand Button */}
        <button
          onClick={() => setFullPlayerOpen(true)}
          className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
          title="Full Player"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
