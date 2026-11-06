'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SONGS, ARTISTS, ALBUMS } from '@/lib/catalogue';
import { SongCard } from '@/components/SongCard';
import { AlbumCard } from '@/components/AlbumCard';
import { Search as SearchIcon, Music, Disc, User } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'artists' | 'albums'>('all');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const cleanQ = query.toLowerCase().trim();

  const filteredSongs = SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(cleanQ) ||
      s.artist_name.toLowerCase().includes(cleanQ) ||
      s.genre_name?.toLowerCase().includes(cleanQ)
  );

  const filteredArtists = ARTISTS.filter(
    (a) => a.name.toLowerCase().includes(cleanQ) || a.bio.toLowerCase().includes(cleanQ)
  );

  const filteredAlbums = ALBUMS.filter(
    (al) => al.title.toLowerCase().includes(cleanQ) || al.artist_name?.toLowerCase().includes(cleanQ)
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Search Input Hero */}
      <div className="relative max-w-3xl">
        <SearchIcon className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-purple-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What track, artist or album do you want to play?"
          className="w-full bg-[#0c0c14] text-white text-base md:text-lg pl-14 pr-6 py-4 rounded-2xl border border-zinc-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-xl transition-all"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Results' },
          { id: 'songs', label: 'Songs', count: filteredSongs.length },
          { id: 'artists', label: 'Artists', count: filteredArtists.length },
          { id: 'albums', label: 'Albums', count: filteredAlbums.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-purple-600 text-white shadow-purple-glow'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {tab.label} {tab.count !== undefined ? `(${tab.count})` : ''}
          </button>
        ))}
      </div>

      {/* Songs Results */}
      {(activeFilter === 'all' || activeFilter === 'songs') && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Songs ({filteredSongs.length})</h2>
          </div>
          {filteredSongs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredSongs.map((song) => (
                <SongCard key={song.id} song={song} playlistContext={filteredSongs} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#0a0a0f] rounded-2xl border border-zinc-900 text-zinc-500 text-sm">
              No matching songs found for "{query}".
            </div>
          )}
        </section>
      )}

      {/* Artists Results */}
      {(activeFilter === 'all' || activeFilter === 'artists') && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-fuchsia-400" />
            <h2 className="text-xl font-bold text-white">Artists ({filteredArtists.length})</h2>
          </div>
          {filteredArtists.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {filteredArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="bg-[#0e0e15]/70 p-4 rounded-2xl border border-zinc-900 flex items-center gap-3"
                >
                  <img src={artist.image_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{artist.name}</h4>
                    <p className="text-xs text-zinc-500">Artist</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#0a0a0f] rounded-2xl border border-zinc-900 text-zinc-500 text-sm">
              No matching artists found.
            </div>
          )}
        </section>
      )}

      {/* Albums Results */}
      {(activeFilter === 'all' || activeFilter === 'albums') && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Disc className="w-5 h-5 text-violet-400" />
            <h2 className="text-xl font-bold text-white">Albums ({filteredAlbums.length})</h2>
          </div>
          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#0a0a0f] rounded-2xl border border-zinc-900 text-zinc-500 text-sm">
              No matching albums found.
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-zinc-500">Loading search...</div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
