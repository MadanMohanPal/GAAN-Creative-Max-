'use client';

import React from 'react';
import { SONGS, ALBUMS, ARTISTS } from '@/lib/catalogue';
import { SongCard } from '@/components/SongCard';
import { AlbumCard } from '@/components/AlbumCard';
import { usePlayer } from '@/components/PlayerContext';
import { Play, Sparkles, Flame, Radio, Clock } from 'lucide-react';

export default function HomePage() {
  const { playSong } = usePlayer();

  const quickPicks = SONGS.slice(0, 4);
  const trending = SONGS.slice(2, 7);
  const chillVibes = SONGS.filter(s => s.genre_name?.includes('Lo-Fi') || s.genre_name?.includes('Ambient'));

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Hero AMOLED Gradient Feature Card */}
      <section className="relative rounded-3xl p-6 md:p-8 overflow-hidden border border-purple-900/40 bg-gradient-to-r from-purple-950/40 via-[#0d0918] to-[#000000]">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none"
             style={{ backgroundImage: `url(${quickPicks[0].cover_url})` }} />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated For You
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Night Drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Atmosphere</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 mb-6 leading-relaxed">
            Experience ultra-deep synthesizers, neon arpeggios and lossless sound tuned specifically for pure AMOLED displays.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => playSong(quickPicks[0], SONGS)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Listening
            </button>
            <button
              onClick={() => playSong(quickPicks[1], SONGS)}
              className="px-5 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium border border-zinc-800 transition-all"
            >
              Shuffle Station
            </button>
          </div>
        </div>
      </section>

      {/* Quick Picks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">Quick Picks</h2>
          </div>
          <span className="text-xs text-zinc-500 font-medium">Based on your taste</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickPicks.map((song) => (
            <SongCard key={song.id} song={song} playlistContext={quickPicks} />
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-fuchsia-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">Trending on GAAN</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trending.map((song) => (
            <SongCard key={song.id} song={song} playlistContext={trending} />
          ))}
        </div>
      </section>

      {/* Featured Albums */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white tracking-wide">New Albums & Releases</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALBUMS.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* AMOLED Late Night Chill */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">Deep Focus & Lo-Fi Calm</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {chillVibes.map((song) => (
            <SongCard key={song.id} song={song} playlistContext={chillVibes} />
          ))}
        </div>
      </section>
    </div>
  );
}
