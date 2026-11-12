'use client';

import React, { useState, useEffect } from 'react';
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
  Sliders,
  Moon,
  Zap,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  Music,
} from 'lucide-react';

const formatTime = (secs: number) => {
  if (isNaN(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const EQUALIZER_PRESETS = [
  'Studio Master',
  'Bass Boost 🔥',
  'Vocal Clarity 🎙️',
  'Acoustic / Sufi 🎸',
  'Electronic / Dance 🎛️',
  'Treble Boost ⚡',
];

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
    likedSongIds,
    playbackSpeed,
    equalizerPreset,
    bassBoost,
    virtualizer,
    sleepTimerMinutes,
    sleepSecondsRemaining,
    isFullPlayerOpen,
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
    setPlaybackSpeed,
    setEqualizerPreset,
    setBassBoost,
    setVirtualizer,
    setSleepTimer,
    cancelSleepTimer,
    reorderQueue,
    removeFromQueue,
  } = usePlayer();

  const [activeTab, setActiveTab] = useState<'player' | 'lyrics' | 'queue' | 'equalizer'>('player');
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showSpeedModal, setShowSpeedModal] = useState(false);

  if (!isFullPlayerOpen || !currentSong) return null;

  const isLiked = likedSongIds.has(currentSong.id);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Split lyrics for karaoke display
  const lyricsLines = (
    currentSong.lyrics ||
    'Instrumental audio with pristine acoustic depth.\nFeel the sound resonance designed by Creative Max.\nPure music, unlimited freedom.'
  )
    .split('\n')
    .filter((l) => l.trim().length > 0);

  const activeLyricsIndex =
    duration > 0
      ? Math.min(
          Math.floor((currentTime / duration) * lyricsLines.length),
          lyricsLines.length - 1
        )
      : 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      {/* Dynamic Ambient Glow Halo */}
      <div
        className={`absolute inset-0 opacity-20 filter blur-3xl pointer-events-none scale-125 transition-transform duration-1000 ${
          isPlaying ? 'scale-150 opacity-30' : 'scale-100 opacity-15'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at center, #7C3AED 0%, #EC4899 30%, #3B0764 60%, #000000 90%)`,
        }}
      />

      {/* Top Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-zinc-900/60 bg-black/40 backdrop-blur-md">
        <button
          onClick={() => setFullPlayerOpen(false)}
          className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
          title="Minimize player"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900/70 p-1 rounded-full border border-zinc-800">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'player'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Now Playing
          </button>
          <button
            onClick={() => setActiveTab('equalizer')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'equalizer'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Studio FX</span>
          </button>
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'lyrics'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lyrics</span>
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'queue'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>Queue ({queue.length})</span>
          </button>
        </div>

        {/* Sleep Timer & Quality badges */}
        <div className="flex items-center gap-2">
          {sleepTimerMinutes !== null && (
            <div
              onClick={() => setShowSleepModal(true)}
              className="cursor-pointer flex items-center gap-1 text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/60 px-2 py-1 rounded-full animate-pulse"
            >
              <Moon className="w-3 h-3 text-purple-400" />
              <span>{Math.floor(sleepSecondsRemaining / 60)}m {sleepSecondsRemaining % 60}s</span>
            </div>
          )}
          <span className="text-[11px] font-semibold text-purple-400 bg-purple-950/50 px-2.5 py-1 rounded-full border border-purple-800/40">
            Hi-Res 320k
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-4 max-w-4xl mx-auto w-full overflow-hidden">
        {activeTab === 'player' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 h-full">
            {/* Album Artwork with Pulsating Ring */}
            <div className="flex flex-col items-center">
              <div
                className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${
                  isPlaying
                    ? 'shadow-purple-600/40 ring-4 ring-purple-500/30 scale-[1.02]'
                    : 'shadow-black ring-1 ring-zinc-800 scale-100'
                }`}
              >
                <img
                  src={currentSong.cover_url}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 18-Bar Dancing Real-time Waveform Spectrum */}
              <div className="flex items-end justify-center gap-1.5 h-8 mt-5 w-64">
                {Array.from({ length: 18 }).map((_, i) => {
                  const delay = (i % 6) * 0.1;
                  return (
                    <div
                      key={i}
                      className={`w-2 rounded-full bg-gradient-to-t from-purple-600 to-pink-500 transition-all ${
                        isPlaying ? 'animate-[bounce_0.8s_ease-in-out_infinite]' : 'h-1.5'
                      }`}
                      style={{
                        animationDelay: `${delay}s`,
                        height: isPlaying ? `${Math.max(6, (Math.sin(i * 0.8) + 1.2) * 12)}px` : '4px',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Song Meta, Actions & Status */}
            <div className="flex flex-col items-start w-full md:w-72">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight line-clamp-1">
                    {currentSong.title}
                  </h1>
                  <p className="text-base text-zinc-400 mt-1 font-medium">{currentSong.artist_name}</p>
                </div>
                <button
                  onClick={() => toggleLike(currentSong.id)}
                  className={`p-3 rounded-full hover:bg-zinc-900 transition-all ${
                    isLiked ? 'text-pink-500 scale-110' : 'text-zinc-400 hover:text-white'
                  }`}
                  title={isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart className={`w-7 h-7 ${isLiked ? 'fill-pink-500' : ''}`} />
                </button>
              </div>

              {/* Dynamic Sound Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-300">
                  {currentSong.album_title || 'Creative Max Studio'}
                </span>
                <span className="text-xs bg-purple-950/60 border border-purple-800/50 px-3 py-1 rounded-full text-purple-300">
                  {equalizerPreset}
                </span>
                {virtualizer && (
                  <span className="text-xs bg-fuchsia-950/60 border border-fuchsia-800/50 px-3 py-1 rounded-full text-fuchsia-300">
                    3D Spatial ON
                  </span>
                )}
              </div>

              {/* Quick Actions Row: Download, Sleep Timer, Speed */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => downloadSong(currentSong)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-purple-400" />
                  <span>Download MP3</span>
                </button>

                <button
                  onClick={() => setShowSleepModal(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                    sleepTimerMinutes !== null
                      ? 'bg-purple-900/40 border-purple-600 text-purple-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{sleepTimerMinutes !== null ? 'Timer' : 'Sleep'}</span>
                </button>

                <button
                  onClick={() => setShowSpeedModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{playbackSpeed}x</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Studio Sound FX & Equalizer Tab */}
        {activeTab === 'equalizer' && (
          <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Sliders className="w-5 h-5" />
              <h2 className="text-lg font-bold text-white">Creative Max Studio Equalizer</h2>
            </div>
            <p className="text-xs text-zinc-400 mb-6 text-center">
              Hardware-accelerated sound profiler with 3D Spatial Virtualizer & Subwoofer Bass Boost
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mb-6">
              {EQUALIZER_PRESETS.map((p) => {
                const isSel = equalizerPreset === p;
                return (
                  <button
                    key={p}
                    onClick={() => setEqualizerPreset(p)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left flex items-center justify-between ${
                      isSel
                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <span>{p}</span>
                    {isSel && <span className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                  </button>
                );
              })}
            </div>

            {/* Bass Subwoofer Slider */}
            <div className="w-full bg-zinc-900/70 border border-zinc-800/60 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Bass Subwoofer Depth</span>
                <span className="text-sm font-mono text-purple-400 font-bold">{bassBoost}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={bassBoost}
                onChange={(e) => setBassBoost(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* 3D Spatial Virtualizer Toggle */}
            <div className="w-full flex items-center justify-between bg-zinc-900/70 border border-zinc-800/60 rounded-xl p-4">
              <div>
                <div className="text-sm font-semibold text-white">3D Spatial Audio Virtualizer</div>
                <div className="text-xs text-zinc-400 mt-0.5">Concert hall reverberation & wider acoustic staging</div>
              </div>
              <button
                onClick={() => setVirtualizer(!virtualizer)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  virtualizer ? 'bg-purple-600' : 'bg-zinc-800'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    virtualizer ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Synced Lyrics Tab */}
        {activeTab === 'lyrics' && (
          <div className="h-full flex flex-col max-w-xl mx-auto w-full bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white tracking-wide">KARAOKE & SYNCED LYRICS</span>
              </div>
              <span className="text-[10px] font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                LIVE SYNC
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {lyricsLines.map((line, idx) => {
                const isActive = idx === activeLyricsIndex && isPlaying;
                return (
                  <div
                    key={idx}
                    className={`transition-all duration-300 p-2.5 rounded-lg ${
                      isActive
                        ? 'text-white text-xl font-bold bg-purple-950/40 border border-purple-700/50 shadow-md shadow-purple-900/30'
                        : idx < activeLyricsIndex
                        ? 'text-zinc-600 text-base'
                        : 'text-zinc-400 text-base hover:text-zinc-200'
                    }`}
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Up Next Queue Tab */}
        {activeTab === 'queue' && (
          <div className="h-full flex flex-col max-w-xl mx-auto w-full bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white tracking-wide">UP NEXT ({queue.length} SONGS)</span>
              </div>
              <span className="text-xs text-zinc-400">Manage Playlist Flow</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {queue.map((song, idx) => {
                const isCurrent = song.id === currentSong.id;
                return (
                  <div
                    key={`${song.id}-${idx}`}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-purple-950/40 border-purple-600/60'
                        : 'bg-zinc-900/60 border-zinc-800/60 hover:border-zinc-700'
                    }`}
                  >
                    <div
                      onClick={() => playSong(song)}
                      className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
                    >
                      <img
                        src={song.cover_url}
                        alt={song.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <div
                          className={`text-sm font-medium truncate ${
                            isCurrent ? 'text-purple-300 font-bold' : 'text-white'
                          }`}
                        >
                          {song.title}
                        </div>
                        <div className="text-xs text-zinc-400 truncate">{song.artist_name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      {idx > 0 && (
                        <button
                          onClick={() => reorderQueue(idx, idx - 1)}
                          className="p-1 text-zinc-400 hover:text-white rounded"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {idx < queue.length - 1 && (
                        <button
                          onClick={() => reorderQueue(idx, idx + 1)}
                          className="p-1 text-zinc-400 hover:text-white rounded"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => removeFromQueue(idx)}
                        className="p-1 text-zinc-400 hover:text-red-400 rounded"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Scrubber & Controls */}
      <footer className="relative z-10 px-6 py-6 border-t border-zinc-900/80 bg-black/60 backdrop-blur-lg max-w-4xl mx-auto w-full">
        {/* Scrubber Bar */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-zinc-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div
            className="flex-1 h-2 bg-zinc-800 rounded-full cursor-pointer relative group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = clickX / rect.width;
              seek(ratio * duration);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md shadow-purple-500/50" />
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-400 w-10">{formatTime(duration)}</span>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleShuffle}
            className={`p-2 transition-colors ${
              shuffle ? 'text-purple-400' : 'text-zinc-400 hover:text-white'
            }`}
            title="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={prevTrack}
              className="p-2 text-zinc-300 hover:text-white transition-colors"
              title="Previous"
            >
              <SkipBack className="w-7 h-7 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white flex items-center justify-center shadow-xl shadow-purple-600/40 transition-transform active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-1" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 text-zinc-300 hover:text-white transition-colors"
              title="Next"
            >
              <SkipForward className="w-7 h-7 fill-current" />
            </button>
          </div>

          <button
            onClick={cycleRepeat}
            className={`p-2 transition-colors ${
              repeatMode !== 'off' ? 'text-purple-400' : 'text-zinc-400 hover:text-white'
            }`}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
          </button>
        </div>
      </footer>

      {/* Sleep Timer Picker Modal */}
      {showSleepModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#101018] border border-zinc-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Moon className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Bedtime Sleep Timer</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Music will automatically pause and fade down when the timer completes.
            </p>

            <div className="space-y-1.5">
              {[
                { label: '15 Minutes', val: 15 },
                { label: '30 Minutes', val: 30 },
                { label: '45 Minutes', val: 45 },
                { label: '60 Minutes', val: 60 },
                { label: 'End of this Song', val: -1 },
                { label: 'Turn off timer', val: 0 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => {
                    setSleepTimer(opt.val);
                    setShowSleepModal(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    sleepTimerMinutes === opt.val
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sleepTimerMinutes === opt.val && <span>✓</span>}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowSleepModal(false)}
              className="mt-4 w-full py-2 text-xs font-semibold text-zinc-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Playback Speed Modal */}
      {showSpeedModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#101018] border border-zinc-800 rounded-2xl p-6 max-w-xs w-full shadow-2xl">
            <div className="flex items-center gap-2 text-purple-400 mb-3">
              <Zap className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Playback Speed</h3>
            </div>

            <div className="space-y-1.5">
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setPlaybackSpeed(s);
                    setShowSpeedModal(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    playbackSpeed === s
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{s === 1.0 ? '1.0x (Normal)' : `${s}x`}</span>
                  {playbackSpeed === s && <span>✓</span>}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowSpeedModal(false)}
              className="mt-3 w-full py-2 text-xs font-semibold text-zinc-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
