'use client';

import React, { useState, useEffect } from 'react';
import { SONGS, ALBUMS, ARTISTS, Song } from '@/lib/catalogue';
import { SongCard } from '@/components/SongCard';
import { AlbumCard } from '@/components/AlbumCard';
import { usePlayer } from '@/components/PlayerContext';
import {
  Play,
  Sparkles,
  Flame,
  Radio,
  Globe2,
  Heart,
  ListMusic,
  History,
  TrendingUp,
  Download,
  Check,
  Disc,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { playSong, history } = usePlayer();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [activeMood, setActiveMood] = useState<string>('All');
  const [pastSearches, setPastSearches] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const moods = ['All', 'Relax', 'Energize', 'Workout', 'Focus', 'Night Drive'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gaan_past_searches');
      if (saved) {
        setPastSearches(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const languages = ['All', 'Hindi', 'Punjabi', 'Urdu', 'Bengali', 'English'];

  // Filter songs according to mood & language
  const moodFilteredSongs = SONGS.filter(s => {
    if (activeMood === 'All') return true;
    const q = activeMood.toLowerCase();
    const title = s.title.toLowerCase();
    const artist = s.artist.toLowerCase();
    if (q === 'relax') {
      return title.includes('kesariya') || title.includes('afreen') || title.includes('tum hi ho') || artist.includes('arijit');
    }
    if (q === 'energize') {
      return title.includes('lover') || title.includes('295') || title.includes('blinding') || artist.includes('diljit');
    }
    if (q === 'workout') {
      return artist.includes('sidhu') || artist.includes('diljit') || title.includes('295');
    }
    if (q === 'focus') {
      return title.includes('afreen') || s.genre.toLowerCase().includes('sufi');
    }
    if (q === 'night drive') {
      return title.includes('cruel') || title.includes('blinding') || title.includes('295');
    }
    return true;
  });

  const filteredSongs = selectedLanguage === 'All'
    ? moodFilteredSongs
    : moodFilteredSongs.filter(s => s.language === selectedLanguage);

  const quickPicks = filteredSongs.slice(0, 4);
  const trending = filteredSongs.slice(0, 6);
  const bollywoodRomance = SONGS.filter(s => s.language === 'Hindi');
  const urduSufi = SONGS.filter(s => s.language === 'Urdu');
  const punjabiHits = SONGS.filter(s => s.language === 'Punjabi');
  const bengaliMelody = SONGS.filter(s => s.language === 'Bengali');

  return (
    <div className="space-y-10 max-w-7xl mx-auto relative pb-12">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-purple-400 font-semibold text-xs animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mood Filters: All, Relax, Energize, Workout, Focus, Night Drive */}
      <section className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
        {moods.map((mood) => {
          const isSelected = activeMood === mood;
          return (
            <button
              key={mood}
              onClick={() => {
                setActiveMood(mood);
                showToast(`Switched to ${mood} Station`);
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-purple-600/40 scale-105 border border-purple-400'
                  : 'bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {mood === 'All' ? '⚡ All' : mood === 'Relax' ? '☕ Relax' : mood === 'Energize' ? '🔥 Energize' : mood === 'Workout' ? '💪 Workout' : mood === 'Focus' ? '🎧 Focus' : '🌙 Night Drive'}
            </button>
          );
        })}
      </section>

      {/* Hero Featured Card with Creative Max Full Audio Engine */}
      <section className="relative rounded-3xl p-6 md:p-8 overflow-hidden border border-purple-900/40 bg-gradient-to-r from-purple-950/70 via-[#100a20] to-[#000000] shadow-2xl">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${SONGS[1].cover_url})` }}
        />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Full-Length Lossless Music • Creative Max Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Stream Any Song <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">Worldwide</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-300 mb-6 leading-relaxed">
            100% full-length uncut studio audio (3-6 minutes). Bollywood, Sidhu Moose Wala, Diljit Dosanjh, Arijit Singh, Taylor Swift & Coke Studio Sufi with 1-click downloads.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                playSong(SONGS[1], SONGS);
                showToast('Playing 295 by Sidhu Moose Wala');
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              Play Sidhu Moose Wala (295)
            </button>
            <button
              onClick={() => {
                playSong(SONGS[0], SONGS);
                showToast('Playing Kesariya by Arijit Singh');
              }}
              className="px-5 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold border border-zinc-800 transition-all text-sm"
            >
              Play Kesariya
            </button>
            <Link
              href="/search"
              className="px-5 py-3 rounded-full bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 hover:text-white font-semibold border border-purple-800/50 transition-all text-sm"
            >
              🔍 Search Any Song
            </Link>
          </div>
        </div>
      </section>

      {/* Past Searches & Quick Jumps (If User has searched) */}
      {pastSearches.length > 0 && (
        <section className="p-4 rounded-2xl bg-[#0c0c14] border border-zinc-900 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-pink-400" />
              <span>Recent Searches & Vibes</span>
            </div>
            <Link href="/search" className="text-xs text-purple-400 hover:underline">View All</Link>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {pastSearches.map((term, i) => (
              <Link
                key={i}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-purple-950/60 border border-zinc-800 hover:border-purple-600 text-xs text-zinc-300 hover:text-white whitespace-nowrap transition-all flex items-center gap-1.5"
              >
                <span>🔍</span>
                <span>{term}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Continue Listening / Recent History */}
      {history.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <History className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">Continue Listening</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {history.slice(0, 6).map((song) => (
              <SongCard key={`hist-${song.id}`} song={song} playlistContext={history} />
            ))}
          </div>
        </section>
      )}

      {/* Language Filter Chips */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
          <Globe2 className="w-4 h-4 text-purple-400" />
          <span>Explore by Language</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  showToast(`Filtering by ${lang === 'All' ? 'All Languages' : lang}`);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-glow scale-105'
                    : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                {lang === 'All' ? '🌐 All Languages' : lang === 'Hindi' ? '🇮🇳 Hindi (Bollywood)' : lang === 'Punjabi' ? '🌾 Punjabi' : lang === 'Urdu' ? '🌙 Urdu (Coke Studio)' : lang === 'Bengali' ? '🎵 Bengali' : '🌍 English Pop'}
              </button>
            );
          })}
        </div>
      </section>

      {/* Curated Vibe Stations (Clean Aesthetic: No Artificial Number Counts) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">Vibe Stations</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => {
              playSong(bollywoodRomance[0], bollywoodRomance);
              showToast('Playing Bollywood Romance Essentials');
            }}
            className="p-5 rounded-2xl bg-gradient-to-br from-pink-950/60 to-black border border-pink-900/50 hover:border-pink-500 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-600 flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg">
              🇮🇳
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">Bollywood Romance</h3>
            <p className="text-xs text-zinc-400 mt-1">Arijit Singh, KK, Mohit Chauhan • Studio Mastered</p>
          </div>

          <div
            onClick={() => {
              playSong(urduSufi[0], urduSufi);
              showToast('Playing Coke Studio & Sufi Legends');
            }}
            className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-black border border-purple-900/50 hover:border-purple-500 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg">
              🌙
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">Coke Studio & Sufi</h3>
            <p className="text-xs text-zinc-400 mt-1">Afreen Afreen, Atif Aslam • Spiritual Acoustics</p>
          </div>

          <div
            onClick={() => {
              playSong(punjabiHits[0], punjabiHits);
              showToast('Playing Punjabi Desi Heat');
            }}
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/60 to-black border border-amber-900/50 hover:border-amber-500 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg">
              🌾
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">Punjabi Desi Heat</h3>
            <p className="text-xs text-zinc-400 mt-1">Sidhu Moose Wala, Diljit, AP Dhillon • High Energy</p>
          </div>

          <div
            onClick={() => {
              playSong(bengaliMelody[0], bengaliMelody);
              showToast('Playing Bengali Melody Nostalgia');
            }}
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-black border border-emerald-900/50 hover:border-emerald-500 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg">
              🎵
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">Bengali Classics</h3>
            <p className="text-xs text-zinc-400 mt-1">Rabindra Sangeet, Hemanta • Soulful Poetics</p>
          </div>
        </div>
      </section>

      {/* Quick Picks for Selected Language */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              {selectedLanguage === 'All' ? 'Quick Picks' : `${selectedLanguage} Quick Picks`}
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-medium">Click track to stream or download instantly</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickPicks.map((song) => (
            <SongCard key={song.id} song={song} playlistContext={filteredSongs} />
          ))}
        </div>
      </section>

      {/* Trending Tracks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-fuchsia-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">Trending Blockbusters</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trending.map((song) => (
            <SongCard key={song.id} song={song} playlistContext={filteredSongs} />
          ))}
        </div>
      </section>

      {/* Spotlight on Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">Artists in the Spotlight</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ARTISTS.slice(0, 6).map((artist) => (
            <Link
              key={artist.id}
              href={`/search?q=${encodeURIComponent(artist.name)}`}
              className="group p-3 rounded-2xl bg-[#0e0e15]/70 hover:bg-[#161622] border border-zinc-900/80 hover:border-purple-600/60 transition-all text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-purple-900/40 group-hover:border-purple-500 group-hover:scale-105 transition-all shadow-lg">
                <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-bold text-white truncate max-w-full group-hover:text-purple-300">{artist.name}</h4>
              <p className="text-[11px] text-zinc-400 truncate max-w-full">{artist.language} • Verified</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Albums */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Disc className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">Iconic Albums & Soundtracks</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALBUMS.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </div>
  );
}
