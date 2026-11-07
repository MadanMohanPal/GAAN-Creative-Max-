'use client';

import React, { useState } from 'react';
import { usePlayer } from './PlayerContext';
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  ListMusic,
  FileText,
  Share2,
  Download,
} from 'lucide-react';

const formatTime = (secs: number) => {
  if (isNaN(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export const FullPlayerModal = () => {
  const {
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
    playSong,
    downloadSong,
  } = usePlayer();

  const [activeTab, setActiveTab] = useState<'player' | 'lyrics' | 'queue'>('player');

  if (!isFullPlayerOpen || !currentSong) return null;

  const isLiked = likedSongIds.has(currentSong.id);

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      {/* Background ambient gradient glow matching song cover */}
      <div
        className="absolute inset-0 opacity-25 filter blur-3xl pointer-events-none scale-125"
        style={{
          backgroundImage: `radial-gradient(circle at center, #7C3AED 0%, #3B0764 45%, #000000 80%)`,
        }}
      />

      {/* Top Header */}
      <header className="relative z-10 px-6 py-5 flex items-center justify-between border-b border-zinc-900/60">
        <button
          onClick={() => setFullPlayerOpen(false)}
          className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900/80 transition-colors"
          title="Minimize player"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 bg-zinc-900/60 p-1 rounded-full border border-zinc-800/80">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'player'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Now Playing
          </button>
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'lyrics'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Lyrics
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'queue'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
            Up Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadSong(currentSong)}
            className="p-2 text-zinc-400 hover:text-purple-400 rounded-full hover:bg-zinc-900/80 transition-colors"
            title="1-Click Download MP3"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: currentSong.title, text: `Listen to ${currentSong.title} on GAAN` });
              } else {
                alert('Link copied to clipboard!');
              }
            }}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900/80 transition-colors"
            title="Share song"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Center Body based on tab */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4 overflow-y-auto max-w-4xl mx-auto w-full">
        {activeTab === 'player' && (
          <div className="flex flex-col items-center max-w-md w-full">
            {/* Glowing Album Vinyl Artwork */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/60 border border-zinc-800/80 group">
              <img
                src={currentSong.cover_url}
                alt={currentSong.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 border border-purple-500/40">
                Creative Max Hi-Res
              </div>
            </div>

            {/* Song title, artist, and heart */}
            <div className="mt-8 w-full flex items-center justify-between">
              <div className="overflow-hidden">
                <h1 className="text-2xl font-bold text-white truncate">{currentSong.title}</h1>
                <p className="text-base text-zinc-400 font-medium truncate mt-0.5">{currentSong.artist_name}</p>
                {currentSong.album_title && (
                  <p className="text-xs text-purple-400 mt-0.5 truncate">{currentSong.album_title}</p>
                )}
              </div>
              <button
                onClick={() => toggleLike(currentSong.id)}
                className="p-3 rounded-full hover:bg-zinc-900 transition-colors"
              >
                <Heart className={`w-7 h-7 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-zinc-400 hover:text-white'}`} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'lyrics' && (
          <div className="w-full max-w-2xl py-6 px-4 bg-[#0a0a0f]/80 rounded-2xl border border-zinc-900 backdrop-blur-md">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-4">Lyrics</h3>
            <div className="whitespace-pre-line text-lg leading-relaxed text-zinc-300 font-medium font-sans">
              {currentSong.lyrics || 'Instrumental piece with rich synth soundscapes.'}
            </div>
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="w-full max-w-2xl py-4 px-2 space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 px-3 mb-2">Playing Queue</h3>
            {queue.map((song, i) => {
              const isCurrent = song.id === currentSong.id;
              return (
                <div
                  key={`${song.id}-${i}`}
                  onClick={() => playSong(song)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-purple-950/60 border border-purple-800/60 text-white'
                      : 'hover:bg-zinc-900/60 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={song.cover_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className={`text-sm font-semibold ${isCurrent ? 'text-purple-300' : 'text-white'}`}>
                        {song.title}
                      </div>
                      <div className="text-xs text-zinc-400">{song.artist_name}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{formatTime(song.duration_seconds)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Controls Area */}
      <footer className="relative z-10 px-6 py-6 border-t border-zinc-900/80 bg-[#000000]/90 backdrop-blur-md max-w-4xl mx-auto w-full">
        {/* Scrubber slider */}
        <div className="w-full mb-4">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs text-zinc-400 font-mono mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleShuffle}
            className={`p-2 transition-colors ${shuffle ? 'text-purple-400' : 'text-zinc-500 hover:text-white'}`}
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={prevTrack}
              className="p-2 text-zinc-300 hover:text-white hover:scale-110 active:scale-95 transition-all"
            >
              <SkipBack className="w-7 h-7 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 transition-all"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 text-zinc-300 hover:text-white hover:scale-110 active:scale-95 transition-all"
            >
              <SkipForward className="w-7 h-7 fill-current" />
            </button>
          </div>

          <button
            onClick={cycleRepeat}
            className={`p-2 transition-colors ${repeatMode !== 'off' ? 'text-purple-400' : 'text-zinc-500 hover:text-white'}`}
          >
            {repeatMode === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
          </button>
        </div>
      </footer>
    </div>
  );
};
