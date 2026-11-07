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
  Download,
  Check,
  HardDriveDownload,
} from 'lucide-react';
import Link from 'next/link';

interface CustomPlaylist {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  coverUrl: string;
  createdAt: string;
}

export default function LibraryPage() {
  const { currentSong, likedSongIds, playSong, history, downloadedSongs, downloadSong, removeDownloadedSong } = usePlayer();
  const [activeTab, setActiveTab] = useState<'downloaded' | 'all' | 'liked' | 'playlists' | 'albums' | 'artists' | 'history'>('downloaded');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<CustomPlaylist | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Custom playlists stored in state + localStorage
  const [playlists, setPlaylists] = useState<CustomPlaylist[]>([
    {
      id: 'pl-1',
      name: 'Bollywood Romance & Sufi',
      description: 'Soulful Bollywood romantic melodies by Creative Max',
      songIds: [SONGS[0].id, SONGS[2].id, SONGS[5]?.id || SONGS[0].id],
      coverUrl: SONGS[0].cover_url,
      createdAt: '2024-05-01',
    },
    {
      id: 'pl-2',
      name: 'Punjabi Blockbusters & Hip-Hop',
      description: 'Sidhu Moose Wala, Diljit & AP Dhillon high energy tracks',
      songIds: [SONGS[1]?.id || SONGS[0].id, SONGS[3]?.id || SONGS[1].id, SONGS[4]?.id || SONGS[2].id],
      coverUrl: SONGS[1]?.cover_url || SONGS[0].cover_url,
      createdAt: '2024-05-02',
    },
    {
      id: 'pl-3',
      name: 'Global Hits & Coke Studio',
      description: 'Worldwide synthwave & mystical sufi harmonics',
      songIds: [SONGS[7]?.id || SONGS[0].id, SONGS[8]?.id || SONGS[1].id, SONGS[13]?.id || SONGS[3].id],
      coverUrl: SONGS[7]?.cover_url || SONGS[0].cover_url,
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
    showToast(`Created playlist "${newPl.name}"`);
  };

  const handleDeletePlaylist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    savePlaylists(playlists.filter((p) => p.id !== id));
    if (selectedPlaylist?.id === id) {
      setSelectedPlaylist(null);
    }
    showToast('Playlist deleted');
  };

  // Find all liked songs
  const likedSongs = SONGS.filter((s) => likedSongIds.has(s.id));

  // Download all liked songs at once
  const downloadAllLiked = async () => {
    showToast(`Downloading all ${likedSongs.length} liked tracks...`);
    for (const song of likedSongs) {
      await downloadSong(song);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-purple-400 font-semibold text-xs animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Library Header with Creative Max Branding */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#120d24] via-[#0a0a14] to-[#05050a] border border-purple-900/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-900/80 text-purple-300 text-[10px] font-bold uppercase tracking-wider border border-purple-600">
              Creative Max Audio Engine
            </span>
            <span className="text-zinc-500 text-xs">• 1-Click Offline Downloads</span>
          </div>
          <h1 className="text-3xl font-black text-white">Your Music Library</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Listen offline, organize custom playlists, and manage favorites. Crafted with passion by <span className="text-purple-400 font-bold">Creative Max</span>.
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

      {/* Navigation Tabs (Clean Modern Labels: No Artificial Number Counts) */}
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('downloaded'); setSelectedPlaylist(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'downloaded'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <HardDriveDownload className="w-3.5 h-3.5" />
          Downloaded Offline
        </button>

        <button
          onClick={() => { setActiveTab('all'); setSelectedPlaylist(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'all'
              ? 'bg-purple-600 text-white shadow-purple-glow'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          All Songs
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
          Liked Songs
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
          Playlists
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
          Albums
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
          Artists
        </button>

        <button
          onClick={() => { setActiveTab('history'); setSelectedPlaylist(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'history'
              ? 'bg-purple-600 text-white shadow-purple-glow'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          History
        </button>
      </div>

      {/* 1. Downloaded Offline Songs Tab */}
      {activeTab === 'downloaded' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Downloaded Offline Tracks</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold uppercase">
                  Ready Offline
                </span>
              </h2>
              <p className="text-xs text-zinc-400">Songs saved directly on your device with 1-click download</p>
            </div>
            {downloadedSongs.length > 0 && (
              <button
                onClick={() => playSong(downloadedSongs[0], downloadedSongs)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Play All Offline
              </button>
            )}
          </div>

          {downloadedSongs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {downloadedSongs.map((song) => (
                <div key={song.id} className="relative group">
                  <SongCard song={song} playlistContext={downloadedSongs} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDownloadedSong(song.id);
                      showToast(`Removed "${song.title}" from downloads`);
                    }}
                    className="absolute bottom-4 right-4 p-1.5 rounded-full bg-black/80 hover:bg-red-600 text-zinc-400 hover:text-white transition-all text-xs z-10 opacity-0 group-hover:opacity-100"
                    title="Delete download"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-[#0a0a0f] rounded-3xl border border-zinc-900 text-zinc-400 space-y-3">
              <HardDriveDownload className="w-14 h-14 mx-auto text-emerald-600/60" />
              <h3 className="text-lg font-bold text-white">No downloaded songs yet</h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Every song card has a 1-click download button (⬇). Tap it on any song to save the full 160kbps MP3 directly to your device for offline listening!
              </p>
              <button
                onClick={() => setActiveTab('all')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold inline-flex items-center gap-1.5 mt-2 shadow-md"
              >
                Browse Songs to Download
              </button>
            </div>
          )}
        </section>
      )}

      {/* 2. All Songs Tab */}
      {activeTab === 'all' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Music Catalog</h2>
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

      {/* 3. Liked Songs Tab */}
      {activeTab === 'liked' && (
        <section className="space-y-4">
          {likedSongs.length > 0 ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Favorite Liked Tracks</h2>
                  <p className="text-xs text-zinc-400">All songs you loved on GAAN</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadAllLiked}
                    className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download All Liked
                  </button>
                  <button
                    onClick={() => playSong(likedSongs[0], likedSongs)}
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Play All Liked
                  </button>
                </div>
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

      {/* 4. Playlists Tab */}
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
                      <Play className="w-4 h-4 fill-current" />
                      Play Playlist
                    </button>
                    <button
                      onClick={(e) => handleDeletePlaylist(selectedPlaylist.id, e)}
                      className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white text-xs font-bold transition-all"
                    >
                      Delete Playlist
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white mb-2">Playlist Songs</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {SONGS.filter((s) => selectedPlaylist.songIds.includes(s.id)).map((song) => (
                    <SongCard key={song.id} song={song} playlistContext={SONGS} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Playlists Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => setSelectedPlaylist(pl)}
                  className="p-5 rounded-2xl bg-[#0e0e15] border border-zinc-900 hover:border-purple-600 cursor-pointer transition-all group flex items-center gap-4"
                >
                  <img src={pl.coverUrl} alt={pl.name} className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-md" />
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-purple-300">{pl.name}</h3>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">{pl.description}</p>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Created: {pl.createdAt}</span>
                  </div>
                  <button
                    onClick={(e) => handleDeletePlaylist(pl.id, e)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 5. Albums Tab */}
      {activeTab === 'albums' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Albums & Soundtracks</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {ALBUMS.map((album) => (
              <div
                key={album.id}
                onClick={() => {
                  const albumSongs = SONGS.filter((s) => s.album_title?.toLowerCase() === album.title.toLowerCase());
                  if (albumSongs.length > 0) playSong(albumSongs[0], albumSongs);
                  else playSong(SONGS[0], SONGS);
                  showToast(`Playing Album: ${album.title}`);
                }}
                className="group bg-[#0e0e15] p-3.5 rounded-2xl border border-zinc-900 hover:border-purple-600 cursor-pointer transition-all"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
                  <img src={album.cover_url} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white truncate">{album.title}</h4>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{album.artist_name}</p>
                <span className="text-[10px] text-zinc-500 font-mono mt-1 block">{album.language || 'Studio Album'}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Artists Tab */}
      {activeTab === 'artists' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Spotlight Artists</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ARTISTS.map((artist) => (
              <Link
                key={artist.id}
                href={`/search?q=${encodeURIComponent(artist.name)}`}
                className="group p-4 rounded-2xl bg-[#0e0e15] border border-zinc-900 hover:border-purple-600 transition-all text-center flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-purple-900/50 group-hover:border-purple-500 group-hover:scale-105 transition-all shadow-xl">
                  <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-sm font-bold text-white truncate max-w-full group-hover:text-purple-300">{artist.name}</h4>
                <p className="text-xs text-zinc-400 truncate max-w-full">{artist.language} • Verified</p>
                <span className="mt-2 text-[10px] text-purple-400 font-bold">Search Songs →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 7. History Tab */}
      {activeTab === 'history' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Listening History</h2>
              <p className="text-xs text-zinc-400">Tracks you recently streamed on GAAN</p>
            </div>
            {history.length > 0 && (
              <button
                onClick={() => playSong(history[0], history)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Play History
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {history.map((song) => (
                <SongCard key={`hist-tab-${song.id}`} song={song} playlistContext={history} />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-[#0a0a0f] rounded-3xl border border-zinc-900 text-zinc-400">
              <History className="w-14 h-14 mx-auto mb-3 text-zinc-600" />
              <h3 className="text-lg font-bold text-white mb-1">No listening history yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Any song you play will automatically appear here so you can pick up right where you left off.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Modal: Create Playlist */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101018] border border-purple-900/60 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Create New Playlist</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 font-bold block mb-1">Playlist Name</label>
                <input
                  type="text"
                  required
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="e.g. My Favorite Chill Hits"
                  className="w-full bg-[#161622] text-white text-sm p-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-bold block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  value={newPlaylistDesc}
                  onChange={(e) => setNewPlaylistDesc(e.target.value)}
                  placeholder="e.g. Mastered by Creative Max"
                  className="w-full bg-[#161622] text-white text-sm p-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-glow"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
