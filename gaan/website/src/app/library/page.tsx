'use client';

import React, { useState } from 'react';
import { SONGS, ALBUMS, ARTISTS } from '@/lib/catalogue';
import { SongCard } from '@/components/SongCard';
import { AlbumCard } from '@/components/AlbumCard';
import { usePlayer } from '@/components/PlayerContext';
import { Heart, ListMusic, Disc, Users, PlusCircle, ArrowUpDown } from 'lucide-react';

export default function LibraryPage() {
  const { likedSongIds, playSong } = usePlayer();
  const [activeTab, setActiveTab] = useState<'liked' | 'playlists' | 'albums' | 'artists'>('liked');

  const likedSongs = SONGS.filter((s) => likedSongIds.has(s.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Library Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Your Music Library</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your saved tracks, custom playlists and favorite artists.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('New playlist created in local session!')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-purple-glow transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Create Playlist
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
        <button
          onClick={() => setActiveTab('liked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'liked'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          Liked Songs ({likedSongs.length})
        </button>

        <button
          onClick={() => setActiveTab('playlists')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'playlists'
              ? 'bg-purple-600 text-white'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <ListMusic className="w-3.5 h-3.5" />
          Playlists (3)
        </button>

        <button
          onClick={() => setActiveTab('albums')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'albums'
              ? 'bg-purple-600 text-white'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <Disc className="w-3.5 h-3.5" />
          Albums ({ALBUMS.length})
        </button>

        <button
          onClick={() => setActiveTab('artists')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'artists'
              ? 'bg-purple-600 text-white'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Artists ({ARTISTS.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'liked' && (
        <section>
          {likedSongs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {likedSongs.map((song) => (
                <SongCard key={song.id} song={song} playlistContext={likedSongs} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#0a0a0f] rounded-2xl border border-zinc-900 text-zinc-400">
              <Heart className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
              <h3 className="text-base font-bold text-white mb-1">No liked songs yet</h3>
              <p className="text-xs text-zinc-500">Tap the heart icon on any song to add it to your library.</p>
            </div>
          )}
        </section>
      )}

      {activeTab === 'playlists' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => playSong(SONGS[0], SONGS)}
            className="p-5 rounded-2xl bg-[#0c0c14] border border-zinc-800/80 hover:border-purple-600/50 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-white">
                <ListMusic className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  Night Drive: Neon Horizons
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">4 songs • Public</p>
              </div>
            </div>
          </div>

          <div
            onClick={() => playSong(SONGS[3], SONGS)}
            className="p-5 rounded-2xl bg-[#0c0c14] border border-zinc-800/80 hover:border-purple-600/50 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-violet-700 to-indigo-600 flex items-center justify-center text-white">
                <ListMusic className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  Deep AMOLED Chill
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">3 songs • Public</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'albums' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALBUMS.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}

      {activeTab === 'artists' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="bg-[#0e0e15]/70 p-4 rounded-2xl border border-zinc-900 text-center"
            >
              <img src={artist.image_url} alt="" className="w-24 h-24 mx-auto rounded-full object-cover mb-3" />
              <h4 className="text-sm font-bold text-white">{artist.name}</h4>
              <p className="text-xs text-zinc-500 mt-0.5">Artist</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
