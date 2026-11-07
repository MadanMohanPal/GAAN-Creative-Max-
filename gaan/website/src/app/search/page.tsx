'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SONGS, ARTISTS, ALBUMS, Song } from '@/lib/catalogue';
import { SongCard } from '@/components/SongCard';
import {
  Search as SearchIcon,
  Music,
  Disc,
  User,
  Loader2,
  X,
  Sparkles,
  TrendingUp,
  History,
  Flame,
} from 'lucide-react';

const TRENDING_SEARCHES = [
  'Kesariya',
  'Sidhu Moose Wala',
  'Arijit Singh',
  'Taylor Swift',
  'Brown Munde',
  'Coke Studio',
  'Diljit Dosanjh',
  'The Weeknd',
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'artists' | 'albums'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [pastSearches, setPastSearches] = useState<string[]>([]);
  const [results, setResults] = useState<{
    songs: Song[];
    relatedSongs: Song[];
    artists: any[];
    albums: any[];
  }>({
    songs: SONGS,
    relatedSongs: SONGS.slice(0, 5),
    artists: ARTISTS,
    albums: ALBUMS,
  });

  // Load past search history
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gaan_past_searches');
      if (saved) {
        setPastSearches(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const saveSearchHistory = (term: string) => {
    if (!term.trim()) return;
    try {
      const updated = [term.trim(), ...pastSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 6);
      setPastSearches(updated);
      localStorage.setItem('gaan_past_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  const removeHistoryItem = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = pastSearches.filter((s) => s !== term);
    setPastSearches(updated);
    try {
      localStorage.setItem('gaan_past_searches', JSON.stringify(updated));
    } catch (e) {}
  };

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
        relatedSongs: SONGS.slice(0, 5),
        artists: ARTISTS,
        albums: ALBUMS,
      });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Fetch via server-side API to bypass CORS and get full 3-5min decrypted audio
        const res = await fetch(`/api/search?q=${encodeURIComponent(cleanQ)}`);
        if (res.ok) {
          const data = await res.json();
          setResults({
            songs: data.songs || [],
            relatedSongs: data.relatedSongs || [],
            artists: data.artists && data.artists.length > 0 ? data.artists : ARTISTS,
            albums: data.albums && data.albums.length > 0 ? data.albums : ALBUMS,
          });
          saveSearchHistory(cleanQ);
        }
      } catch (err) {
        console.warn('Search API fallback:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Search Input Hero with Creative Max Branding */}
      <div className="relative max-w-3xl">
        <SearchIcon className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-purple-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ANY full-length song (e.g. Kesariya, Sidhu Moose Wala, Taylor Swift)..."
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

      {/* Past Searches Chips */}
      {pastSearches.length > 0 && !query && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span>Recent Searches:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {pastSearches.map((term) => (
              <div
                key={term}
                onClick={() => setQuery(term)}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#12121c] border border-zinc-800 text-zinc-300 hover:text-white hover:border-purple-600 cursor-pointer transition-all text-xs"
              >
                <span>{term}</span>
                <button
                  onClick={(e) => removeHistoryItem(term, e)}
                  className="text-zinc-500 hover:text-red-400 p-0.5 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Filter Tabs (Clean Labels without Counters) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Results' },
          { id: 'songs', label: 'Songs' },
          { id: 'artists', label: 'Artists' },
          { id: 'albums', label: 'Albums' },
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
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Songs Results */}
      {(activeFilter === 'all' || activeFilter === 'songs') && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                {query ? 'Songs & Tracks' : 'Popular Songs'}
              </h2>
            </div>
            {query && (
              <span className="text-xs font-bold text-pink-400 flex items-center gap-1 bg-pink-950/50 px-2.5 py-1 rounded-full border border-pink-700/40">
                <Sparkles className="w-3.5 h-3.5" /> Full Studio Tracks • 1-Click Download
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
              No matching tracks found for "{query}". Try searching another title.
            </div>
          )}
        </section>
      )}

      {/* Mood & Related Songs Suggestion Section */}
      {query && results.relatedSongs && results.relatedSongs.length > 0 && (
        <section className="p-6 rounded-3xl bg-gradient-to-r from-[#120d24] via-[#090912] to-black border border-purple-900/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-pink-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Recommended for this Vibe</h3>
                <p className="text-xs text-zinc-400">Based on your search for "{query}"</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {results.relatedSongs.map((song) => (
              <SongCard key={`rel-${song.id}`} song={song} playlistContext={results.relatedSongs} />
            ))}
          </div>
        </section>
      )}

      {/* Artists Results */}
      {(activeFilter === 'all' || activeFilter === 'artists') && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-fuchsia-400" />
            <h2 className="text-xl font-bold text-white">Artists</h2>
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
            <h2 className="text-xl font-bold text-white">Albums</h2>
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
