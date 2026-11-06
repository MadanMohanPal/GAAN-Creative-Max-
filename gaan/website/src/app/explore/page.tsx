'use client';

import React from 'react';
import { GENRES, ARTISTS, SONGS } from '@/lib/catalogue';
import { GenreCard } from '@/components/GenreCard';
import { SongCard } from '@/components/SongCard';
import { Compass, Trophy, Users } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Explore Header */}
      <div>
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          Discovery Center
        </div>
        <h1 className="text-3xl font-black text-white">Explore & Moods</h1>
        <p className="text-sm text-zinc-400 mt-1">Browse by sonic mood, frequency, or community top charts.</p>
      </div>

      {/* Moods and Genres Grid */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Moods & Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {GENRES.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </section>

      {/* Top Charts */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Top 5 Chart Streams</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SONGS.slice(0, 5).map((song, idx) => (
            <div key={song.id} className="relative">
              <div className="absolute top-2 left-2 z-10 w-7 h-7 rounded-lg bg-black/80 backdrop-blur-md flex items-center justify-center font-black text-xs text-purple-300 border border-purple-500/40">
                #{idx + 1}
              </div>
              <SongCard song={song} playlistContext={SONGS} />
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight Artists */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Featured Artists</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="group bg-[#0e0e15]/70 hover:bg-[#161622] p-4 rounded-2xl border border-zinc-900/80 hover:border-purple-900/60 transition-all text-center cursor-pointer"
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-3 border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors shadow-lg shadow-purple-950/40">
                <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{artist.name}</h4>
              <p className="text-xs text-zinc-500 mt-1">{(artist.monthly_listeners / 1000).toFixed(0)}k monthly listeners</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
