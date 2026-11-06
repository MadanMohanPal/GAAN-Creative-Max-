'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SONGS, ARTISTS, ALBUMS, Song } from '@/lib/catalogue';
import { searchGlobalMusic } from '@/lib/globalSearch';
import { SongCard } from '@/components/SongCard';
import { AlbumCard } from '@/components/AlbumCard';
import { Search as SearchIcon, Music, Disc, User, Loader2, X, Sparkles, TrendingUp } from 'lucide-react';

const TRENDING_SEARCHES = [
  'Kesariya',
  'Sidhu Moose Wala',
  'Arijit Singh',
  'Taylor Swift',
  'Brown Munde',
  'Coke Studio',
  'Diljit Dosanjh',
  'The Weeknd',
  'Pasoori',
  'Rabindra Sangeet',
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'artists' | 'albums'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    songs: Song[];
    artists: any[];
    albums: any[];
  }>({
    songs: SONGS,
    artists: ARTISTS,
    albums: ALBUMS,
  });

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    const cleanQ = query.trim();
    if (!cleanQ) {
      setResults({
        songs: SONGS,
        artists: ARTISTS,
        albums: ALBUMS,
      });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);

      // 1. Filter local catalogue
      const localMatches = SONGS.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQ.toLowerCase()) ||
          s.artist_name.toLowerCase().includes(cleanQ.toLowerCase()) ||
          s.genre_name?.toLowerCase().includes(cleanQ.toLowerCase())
      );

      // 2. Query worldwide music database (iTunes API with 100M+ songs)
      try {
        const globalData = await searchGlobalMusic(cleanQ);
        const seenTitles = new Set(localMatches.map((s) => s.title.toLowerCase()));
        const uniqueGlobal = globalData.songs.filter(
          (s) => !seenTitles.has(s.title.toLowerCase())
        );

        setResults({
          songs: [...localMatches, ...uniqueGlobal],
          artists: globalData.artists.length > 0 ? globalData.artists : ARTISTS,
          albums: globalData.albums.length > 0 ? globalData.albums : ALBUMS,
        });
      } catch (err) {
        setResults({
          songs: localMatches,
          artists: ARTISTS,
          albums: ALBUMS,
        });
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Search Input Hero */}
      <div className="relative max-w-3xl">
        <SearchIcon className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-purple-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ANY song in the world (Hindi, English, Punjabi, Urdu, Bengali)..."
          className="w-full bg-[#0c0c14] text-white text-base md:text-lg pl-14 pr-12 py-4 rounded-2xl border border-zinc-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-xl transition-all placeholder:text-zinc-500"
        />
        {isLoading ? (
          <Loader2 className="w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 text-purple-400 animate-spin" />
        ) : query ? (
          <button
            onClick={() => setQuery('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        ) : null}
      </div>

      {/* Suggested Quick Searches */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs text-purple-400 font-bold uppercase tracking-wider shrink-0 mr-1">
          <TrendingUp className="w-3.5 h-3.5" />
          Popular:
        </div>
        {TRENDING_SEARCHES.map((term) => (
          <button
            key={term}
            onClick={() => setQuery(term)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#12121c] border border-zinc-800 text-zinc-300 hover:text-white hover:border-purple-600 hover:bg-purple-950/40 transition-all shrink-0 flex items-center gap-1"
          >
            <span>{term}</span>
          </button>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Results' },
          { id: 'songs', label: 'Songs', count: results.songs.length },
          { id: 'artists', label: 'Artists', count: results.artists.length },
          { id: 'albums', label: 'Albums', count: results.albums.length },
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                {query ? `Global Song Results (${results.songs.length})` : 'Popular Tracks'}
              </h2>
            </div>
            {query && (
              <span className="text-xs text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Worldwide Live Catalog
              </span>
            )}
          </div>

          {results.songs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.songs.map((song) => (
                <SongCard key={song.id} song={song} playlistContext={results.songs} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#0a0a0f] rounded-2xl border border-zinc-900 text-zinc-500 text-sm">
              No matching tracks found for "{query}". Try searching an artist like "Arijit Singh" or "Taylor Swift".
            </div>
          )}
        </section>
      )}

      {/* Artists Results */}
      {(activeFilter === 'all' || activeFilter === 'artists') && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-fuchsia-400" />
            <h2 className="text-xl font-bold text-white">Artists ({results.artists.length})</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.artists.map((artist) => (
              <div
                key={artist.id}
                onClick={() => setQuery(artist.name)}
                className="group bg-[#0e0e15]/70 hover:bg-[#161622] p-4 rounded-2xl border border-zinc-900/80 hover:border-purple-900/60 transition-all text-center cursor-pointer"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 border border-purple-500/20 group-hover:border-purple-500 transition-colors">
                  <img
                    src={artist.image_url}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-bold text-white truncate group-hover:text-purple-300">
                  {artist.name}
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">Artist</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums Results */}
      {(activeFilter === 'all' || activeFilter === 'albums') && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Disc className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl font-bold text-white">Albums ({results.albums.length})</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.albums.map((album) => (
              <div
                key={album.id}
                onClick={() => setQuery(album.title)}
                className="group bg-[#0e0e15]/70 hover:bg-[#161622] p-3.5 rounded-2xl border border-zinc-900/80 hover:border-purple-900/60 transition-all cursor-pointer"
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden mb-3 bg-zinc-950">
                  <img
                    src={album.cover_url}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white truncate group-hover:text-purple-300">
                  {album.title}
                </h4>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{album.artist_name}</p>
                <p className="text-[11px] text-zinc-500 mt-1">{album.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-zinc-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
          Loading Search...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
