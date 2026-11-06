import React, { useState } from 'react';
import {
  Music,
  Users,
  Disc,
  Radio,
  BarChart3,
  Database,
  Plus,
  Play,
  Pause,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
} from 'lucide-react';

interface SongItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  plays: number;
  duration: string;
  audioUrl: string;
}

const INITIAL_SONGS: SongItem[] = [
  { id: '1', title: 'Cybernetic Skyline', artist: 'Neon Mirage', album: 'Midnight Odyssey', genre: 'Synthwave', plays: 452100, duration: '6:12', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'Neon Highway 86', artist: 'Neon Mirage', album: 'Midnight Odyssey', genre: 'Synthwave', plays: 320140, duration: '7:03', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', title: 'Midnight Echoes', artist: 'Neon Mirage', album: 'Midnight Odyssey', genre: 'Synthwave', plays: 198300, duration: '5:48', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '4', title: 'Late Night Study Session', artist: 'Aura Minimal', album: 'Tape Loops & Rain', genre: 'Lo-Fi Chill', plays: 612400, duration: '5:02', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '5', title: 'Coffee in the Rain', artist: 'Aura Minimal', album: 'Tape Loops & Rain', genre: 'Lo-Fi Chill', plays: 490200, duration: '4:44', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: '6', title: 'Cosmic Aurora', artist: 'Solstice Orbit', album: 'Starlight Singularity', genre: 'Deep Ambient', plays: 284300, duration: '6:35', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalogue' | 'artists' | 'system'>('catalogue');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioElement] = useState(() => new Audio());
  const [search, setSearch] = useState('');

  const toggleTestPlayback = (song: SongItem) => {
    if (playingId === song.id) {
      audioElement.pause();
      setPlayingId(null);
    } else {
      audioElement.src = song.audioUrl;
      audioElement.play().catch(console.error);
      setPlayingId(song.id);
    }
  };

  const filteredSongs = INITIAL_SONGS.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#000000] text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#08080d] border-r border-zinc-900 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-4 border-b border-zinc-900">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center font-black text-white text-lg">
              G
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">GAAN STUDIO</h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Admin Ecosystem</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'catalogue', label: 'Music Catalogue', icon: Music },
              { id: 'artists', label: 'Artists & Albums', icon: Users },
              { id: 'system', label: 'Supabase & RLS Health', icon: ShieldCheck },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-950/70 text-purple-300 border-l-4 border-purple-500'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-3 rounded-xl bg-[#0e0e16] border border-zinc-800 text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Database</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> PostgreSQL
            </span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span>Auth Policies</span>
            <span className="text-purple-400 font-semibold">10 RLS Active</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-zinc-900 px-8 flex items-center justify-between bg-[#040407]">
          <h1 className="text-lg font-bold text-white uppercase tracking-wider">
            {activeTab === 'catalogue' && 'Catalogue Repository'}
            {activeTab === 'artists' && 'Artist Roster & Discography'}
            {activeTab === 'system' && 'Infrastructure & Security'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-800 text-[11px] font-semibold text-purple-300">
              Environment: Production / Dev
            </span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Active Catalogue Songs', val: '8 Tracks', sub: 'SoundHelix Licensed' },
              { label: 'Total Stream Plays', val: '2,058,140', sub: '+12.4% this week' },
              { label: 'Verified Artists', val: '4 Artists', sub: 'Synthwave & Lo-Fi' },
              { label: 'Storage Bandwidth', val: '3.8 GB', sub: 'CDN Edge Cached' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#09090f] border border-zinc-900">
                <span className="text-xs text-zinc-400 font-medium">{stat.label}</span>
                <div className="text-2xl font-black text-white mt-1">{stat.val}</div>
                <span className="text-[11px] text-purple-400 font-mono mt-0.5 block">{stat.sub}</span>
              </div>
            ))}
          </div>

          {activeTab === 'catalogue' && (
            <div className="rounded-2xl bg-[#09090f] border border-zinc-900 overflow-hidden">
              <div className="p-4 border-b border-zinc-900 flex items-center justify-between">
                <div className="relative w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search song title or artist..."
                    className="w-full bg-[#12121a] text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <button
                  onClick={() => alert('New track modal (Phase 1)')}
                  className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-purple-glow"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Track
                </button>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-[#050508] text-zinc-400 border-b border-zinc-900 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Preview</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Artist</th>
                    <th className="py-3 px-4">Album</th>
                    <th className="py-3 px-4">Genre</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Total Plays</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {filteredSongs.map(song => (
                    <tr key={song.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleTestPlayback(song)}
                          className="w-7 h-7 rounded-full bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white flex items-center justify-center transition-all"
                        >
                          {playingId === song.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                        </button>
                      </td>
                      <td className="py-3 px-4 font-bold text-white">{song.title}</td>
                      <td className="py-3 px-4 text-purple-300">{song.artist}</td>
                      <td className="py-3 px-4 text-zinc-400">{song.album}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">
                          {song.genre}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{song.duration}</td>
                      <td className="py-3 px-4 font-mono">{song.plays.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'artists' && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Neon Mirage', genre: 'Synthwave', listeners: '1,845,000', bio: 'Analog synthesizers and dystopian retro-futuristic soundscapes.' },
                { name: 'Aura Minimal', genre: 'Lo-Fi Chill', listeners: '920,400', bio: 'Introspective lo-fi textures and warm tape-saturated chords.' },
                { name: 'Solstice Orbit', genre: 'Post-Rock / Space', listeners: '1,420,000', bio: 'Cinematic post-rock and electronic fusion.' },
                { name: 'Komorebi Sound', genre: 'Acoustic Ambient', listeners: '580,000', bio: 'Organic ambient arrangements blending field recordings with piano.' },
              ].map((art, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#09090f] border border-zinc-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{art.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 text-[10px] font-bold">
                      {art.genre}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{art.bio}</p>
                  <div className="text-xs text-zinc-500 font-mono pt-2 border-t border-zinc-900">
                    Monthly Listeners: <span className="text-zinc-300 font-bold">{art.listeners}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#09090f] border border-zinc-900">
                <h3 className="text-sm font-bold text-white mb-2">Supabase Database Tables & RLS Status</h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {[
                    'profiles — RLS ENABLED (Public read, Owner update)',
                    'songs — RLS ENABLED (Public read, Admin manage)',
                    'artists — RLS ENABLED (Public read, Admin manage)',
                    'albums — RLS ENABLED (Public read, Admin manage)',
                    'genres — RLS ENABLED (Public read, Admin manage)',
                    'playlists — RLS ENABLED (Public & Private isolation)',
                    'playlist_songs — RLS ENABLED (Junction security)',
                    'liked_songs — RLS ENABLED (Strict user isolation)',
                    'listening_history — RLS ENABLED (Strict user isolation)',
                    'user_preferences — RLS ENABLED (Strict user isolation)',
                  ].map((table, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#050508] border border-zinc-900 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-zinc-300">{table}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
