'use client';

import React, { useState } from 'react';
import { SONGS, ALBUMS, ARTISTS, Song } from '@/lib/catalogue';
import { SongCard } from '@/components/SongCard';
import { AlbumCard } from '@/components/AlbumCard';
import { usePlayer } from '@/components/PlayerContext';
import { Play, Sparkles, Flame, Radio, Globe2, Heart, ListMusic, Plus, Check } from 'lucide-react';

export default function HomePage() {
  const { playSong, likedSongIds, toggleLike } = usePlayer();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const languages = ['All', 'Hindi', 'Punjabi', 'Urdu', 'Bengali', 'English'];

  const filteredSongs = selectedLanguage === 'All'
    ? SONGS
    : SONGS.filter(s => s.language === selectedLanguage);

  const quickPicks = filteredSongs.slice(0, 4);
  const trending = filteredSongs.slice(0, 6);
  const bollywoodRomance = SONGS.filter(s => s.language === 'Hindi');
  const urduSufi = SONGS.filter(s => s.language === 'Urdu');
  const punjabiHits = SONGS.filter(s => s.language === 'Punjabi');
  const bengaliMelody = SONGS.filter(s => s.language === 'Bengali');

  return (
    <div className="space-y-10 max-w-7xl mx-auto relative">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-purple-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-purple-400 font-semibold text-xs animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Featured Card with Tum Hi Ho / Bollywood Superhit */}
      <section className="relative rounded-3xl p-6 md:p-8 overflow-hidden border border-purple-900/40 bg-gradient-to-r from-purple-950/60 via-[#100a20] to-[#000000]">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${SONGS[0].cover_url})` }}
        />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Bollywood & Desi Mega Station
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Tum Hi Ho <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">& Arijit Hits</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-300 mb-6 leading-relaxed">
            Experience iconic Bollywood romance, Coke Studio Urdu Sufi, Punjabi beats & Bengali melodies in true AMOLED black with real audio streaming.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playSong(SONGS[0], SONGS);
                showToast('Playing Tum Hi Ho by Arijit Singh');
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              Play Arijit Singh
            </button>
            <button
              onClick={() => {
                const urduSong = SONGS.find(s => s.id === 'song-afreen-afreen') || SONGS[6];
                playSong(urduSong, SONGS);
                showToast('Playing Afreen Afreen (Coke Studio)');
              }}
              className="px-5 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold border border-zinc-800 transition-all text-sm"
            >
              Play Coke Studio
            </button>
          </div>
        </div>
      </section>

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

      {/* Curated Playlists Shelves */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">Language Playlists</h2>
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
            <p className="text-xs text-zinc-400 mt-1">Arijit Singh, KK, Mohit Chauhan • {bollywoodRomance.length} Tracks</p>
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
            <p className="text-xs text-zinc-400 mt-1">Afreen Afreen, Atif Aslam • {urduSufi.length} Tracks</p>
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
            <p className="text-xs text-zinc-400 mt-1">Enna Sona, Ambarsariya • {punjabiHits.length} Tracks</p>
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
            <p className="text-xs text-zinc-400 mt-1">Rabindra Sangeet, Hemanta • {bengaliMelody.length} Tracks</p>
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
          <span className="text-xs text-zinc-400 font-medium">Click track to stream instantly</span>
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
            <h2 className="text-xl font-bold text-white tracking-wide">Trending & Most Played</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trending.map((song) => (
            <SongCard key={song.id} song={song} playlistContext={filteredSongs} />
          ))}
        </div>
      </section>

      {/* Featured Albums */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white tracking-wide">Iconic Albums & Soundtracks</h2>
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
