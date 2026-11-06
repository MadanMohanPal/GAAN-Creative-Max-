'use client';

import React, { useState, useEffect } from 'react';
import { SONGS, ALBUMS, ARTISTS, Song } from '@/lib/catalogue';
import { SongCard } from '@/components/SongCard';
import { usePlayer } from '@/components/PlayerContext';
import {
  Heart,
  ListMusic,
  Disc,
  Users,
  PlusCircle,
  Play,
  Trash2,
  X,
  Music,
  History,
  Sparkles,
  Layers,
} from 'lucide-react';

interface CustomPlaylist {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  coverUrl: string;
  createdAt: string;
}

export default function LibraryPage() {
  const { currentSong, likedSongIds, playSong } = usePlayer();
  const [activeTab, setActiveTab] = useState<'all' | 'liked' | 'playlists' | 'albums' | 'artists' | 'history'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<CustomPlaylist | null>(null);

  // Custom playlists stored in state + localStorage
  const [playlists, setPlaylists] = useState<CustomPlaylist[]>([
    {
      id: 'pl-1',
      name: 'Bollywood Romance & Sufi',
      description: 'Soulful Bollywood romantic melodies by Creative Max',
      songIds: [SONGS[0].id, SONGS[1].id, SONGS[3].id, SONGS[4]?.id || SONGS[0].id],
      coverUrl: SONGS[0].cover_url,
      createdAt: '2024-05-01',
    },
    {
      id: 'pl-2',
      name: 'Coke Studio Masterpieces',
      description: 'Mystical sufi and Coke Studio anthems',
      songIds: [SONGS[5]?.id || SONGS[0].id, SONGS[6]?.id || SONGS[1].id, SONGS[7]?.id || SONGS[2].id],
      coverUrl: SONGS[5]?.cover_url || SONGS[0].cover_url,
      createdAt: '2024-05-02',
    },
    {
      id: 'pl-3',
      name: 'Punjabi & Global Beats',
      description: 'High octane Punjabi hits for road trips',
      songIds: [SONGS[8]?.id || SONGS[0].id, SONGS[9]?.id || SONGS[1].id, SONGS[10]?.id || SONGS[3].id],
      coverUrl: SONGS[8]?.cover_url || SONGS[0].cover_url,
      createdAt: '2024-05-03',
    },
  ]);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gaan_custom_playlists');
      if (saved) {
        setPlaylists(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const savePlaylists = (updated: CustomPlaylist[]) => {
    setPlaylists(updated);
    try {
      localStorage.setItem('gaan_custom_playlists', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    const randomSong = SONGS[Math.floor(Math.random() * SONGS.length)];
    const newPl: CustomPlaylist = {
      id: `pl-${Date.now()}`,
      name: newPlaylistName.trim(),
      description: newPlaylistDesc.trim() || 'Curated with passion by Creative Max',
      songIds: [randomSong.id],
      coverUrl: randomSong.cover_url,
      createdAt: new Date().toISOString().split('T')[0],
    };

    savePlaylists([newPl, ...playlists]);
    setNewPlaylistName('');
    setNewPlaylistDesc('');
    setIsCreateModalOpen(false);
  };

  const handleDeletePlaylist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    savePlaylists(playlists.filter((p) => p.id !== id));
    if (selectedPlaylist?.id === id) {
      setSelectedPlaylist(null);
    }
  };

  // Find all liked songs (plus safeguard fallback so it always displays liked items)
  const likedSongs = SONGS.filter((s) => likedSongIds.has(s.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Library Header with Creative Max Branding */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#120d24] via-[#0a0a14] to-[#05050a] border border-purple-900/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-900/80 text-purple-300 text-[10px] font-bold uppercase tracking-wider border border-purple-600">
              Creative Max Music Engine
            </span>
            <span className="text-zinc-500 text-xs">• Lossless Audio</span>
          </div>
          <h1 className="text-3xl font-black text-white">Your Music Library</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Browse all tracks, custom playlists, and favorites. Crafted with passion by <span className="text-purple-400 font-bold">Creative Max</span>.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-xs font-bold flex items-center gap-2 shadow-purple-glow transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Create Playlist
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('all'); setSelectedPlaylist(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'all'
              ? 'bg-purple-600 text-white shadow-purple-glow'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          All Songs ({SONGS.length})
        </button>

        <button
          onClick={() => { setActiveTab('liked'); setSelectedPlaylist(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'liked'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-pink-glow'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          Liked Songs ({likedSongs.length})
        </button>

        <button
          onClick={() => { setActiveTab('playlists'); setSelectedPlaylist(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'playlists'
              ? 'bg-purple-600 text-white shadow-purple-glow'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <ListMusic className="w-3.5 h-3.5" />
          Playlists ({playlists.length})
        </button>

        <button
          onClick={() => { setActiveTab('albums'); setSelectedPlaylist(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'albums'
              ? 'bg-purple-600 text-white shadow-purple-glow'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <Disc className="w-3.5 h-3.5" />
          Albums ({ALBUMS.length})
        </button>

        <button
          onClick={() => { setActiveTab('artists'); setSelectedPlaylist(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'artists'
              ? 'bg-purple-600 text-white shadow-purple-glow'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Artists ({ARTISTS.length})
        </button>
      </div>

      {/* 1. All Songs Tab */}
      {activeTab === 'all' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Entire Music Catalog ({SONGS.length} Full Songs)</h2>
              <p className="text-xs text-zinc-400">Mastered by Creative Max in High-Fidelity Lossless Audio</p>
            </div>
            <button
              onClick={() => playSong(SONGS[0], SONGS)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Play All Tracks
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SONGS.map((song) => (
              <SongCard key={song.id} song={song} playlistContext={SONGS} />
            ))}
          </div>
        </section>
      )}

      {/* 2. Liked Songs Tab */}
      {activeTab === 'liked' && (
        <section className="space-y-4">
          {likedSongs.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Favorite Liked Tracks ({likedSongs.length})</h2>
                  <p className="text-xs text-zinc-400">All songs you loved on GAAN</p>
                </div>
                <button
                  onClick={() => playSong(likedSongs[0], likedSongs)}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Play All Liked
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {likedSongs.map((song) => (
                  <SongCard key={song.id} song={song} playlistContext={likedSongs} />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-16 text-center bg-[#0a0a0f] rounded-3xl border border-zinc-900 text-zinc-400">
              <Heart className="w-14 h-14 mx-auto mb-3 text-zinc-600" />
              <h3 className="text-lg font-bold text-white mb-1">No liked songs yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Tap the heart icon on any song from the "All Songs" tab or Search to save it here.
              </p>
            </div>
          )}
        </section>
      )}

      {/* 3. Playlists Tab */}
      {activeTab === 'playlists' && (
        <section className="space-y-6">
          {selectedPlaylist ? (
            /* Selected Playlist Detail View */
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedPlaylist(null)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700"
                >
                  ← Back to Playlists
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-3xl bg-[#0f0f18] border border-purple-900/40">
                <img
                  src={selectedPlaylist.coverUrl}
                  alt={selectedPlaylist.name}
                  className="w-36 h-36 rounded-2xl object-cover shadow-2xl shrink-0"
                />
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                    Playlist by Creative Max
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{selectedPlaylist.name}</h1>
                  <p className="text-xs text-zinc-400 mt-1">{selectedPlaylist.description}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        const plSongs = SONGS.filter((s) => selectedPlaylist.songIds.includes(s.id));
                        if (plSongs.length > 0) playSong(plSongs[0], plSongs);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold flex items-center gap-2 shadow-purple-glow"
                    >
                      <Play className="w-4 h-4 fill-current" /> Play Playlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Playlist Tracks */}
              <div>
                <h3 className="text-base font-bold text-white mb-3">Songs in this Playlist</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {SONGS.filter((s) => selectedPlaylist.songIds.includes(s.id)).map((song) => (
                    <SongCard key={song.id} song={song} playlistContext={SONGS} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Playlists Grid */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Your Custom Playlists ({playlists.length})</h2>
                  <p className="text-xs text-zinc-400">Created by you and powered by Creative Max</p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  New Playlist
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {playlists.map((pl) => {
                  const plSongs = SONGS.filter((s) => pl.songIds.includes(s.id));
                  return (
                    <div
                      key={pl.id}
                      onClick={() => setSelectedPlaylist(pl)}
                      className="group relative bg-[#0e0e15]/70 hover:bg-[#161622] p-4 rounded-2xl border border-zinc-900/80 hover:border-purple-900/60 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 relative">
                          <img
                            src={pl.coverUrl}
                            alt={pl.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-8 h-8 fill-purple-400 text-purple-400" />
                          </div>
                        </div>

                        <div className="overflow-hidden flex-1">
                          <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                            {pl.name}
                          </h3>
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{pl.description}</p>
                          <span className="text-[11px] text-zinc-500 mt-2 block">
                            {pl.songIds.length} tracks • {pl.createdAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-900/60">
                        <span className="text-xs font-semibold text-purple-400 group-hover:underline flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 fill-current" /> Open & Play
                        </span>
                        <button
                          onClick={(e) => handleDeletePlaylist(pl.id, e)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-zinc-900 transition-colors"
                          title="Delete playlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. Albums Tab */}
      {activeTab === 'albums' && (
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ALBUMS.map((album) => {
              const albumSongs = SONGS.filter((s) => s.album_title === album.title);
              return (
                <div
                  key={album.id}
                  onClick={() => albumSongs.length > 0 && playSong(albumSongs[0], albumSongs)}
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
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {album.release_date ? album.release_date.substring(0, 4) : '2024'} • {albumSongs.length} songs
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. Artists Tab */}
      {activeTab === 'artists' && (
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ARTISTS.map((artist) => {
              const artistSongs = SONGS.filter((s) =>
                s.artist_name.toLowerCase().includes(artist.name.toLowerCase())
              );
              return (
                <div
                  key={artist.id}
                  onClick={() => artistSongs.length > 0 && playSong(artistSongs[0], artistSongs)}
                  className="group bg-[#0e0e15]/70 hover:bg-[#161622] p-4 rounded-2xl border border-zinc-900/80 hover:border-purple-900/60 transition-all text-center cursor-pointer"
                >
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 border-2 border-purple-500/20 group-hover:border-purple-400 transition-colors">
                    <img
                      src={artist.image_url}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-purple-300">
                    {artist.name}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">{artistSongs.length} songs</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Create Playlist Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12121c] border border-purple-900/50 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <Music className="w-5 h-5" />
                Create New Playlist
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Playlist Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Late Night Bollywood, Punjabi Gym"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full bg-[#0a0a0f] text-white text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Description (optional)</label>
                <textarea
                  placeholder="Curated playlist mood powered by Creative Max..."
                  rows={3}
                  value={newPlaylistDesc}
                  onChange={(e) => setNewPlaylistDesc(e.target.value)}
                  className="w-full bg-[#0a0a0f] text-white text-sm px-4 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 text-white shadow-purple-glow"
                >
                  Save Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
