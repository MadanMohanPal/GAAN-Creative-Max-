'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Search, Library, Heart, ListMusic, PlusCircle, Sparkles } from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Library', href: '/library', icon: Library },
  ];

  return (
    <aside className="w-64 bg-[#050508] border-r border-[#171722] flex flex-col h-screen select-none z-20 shrink-0">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-500 to-fuchsia-500 p-0.5 flex items-center justify-center shadow-purple-glow">
          <div className="w-full h-full bg-[#000000] rounded-[10px] flex items-center justify-center">
            <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">G</span>
          </div>
        </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-wider text-white">GAAN</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white">CREATIVE MAX</span>
            </div>
            <span className="text-[10px] text-zinc-400 tracking-wide font-medium">By Creative Max Studio</span>
          </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-950/60 to-violet-900/30 text-white border-l-4 border-purple-500 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-zinc-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="px-6 py-3">
        <div className="h-[1px] bg-zinc-900" />
      </div>

      {/* Quick Playlists / Library section */}
      <div className="px-3 flex-1 overflow-y-auto space-y-1">
        <div className="px-4 pb-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
          Quick Access
        </div>
        <Link
          href="/library?tab=liked"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
        >
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center text-white">
            <Heart className="w-3.5 h-3.5 fill-white" />
          </div>
          <span>Liked Songs</span>
        </Link>
        <Link
          href="/library?tab=playlists"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
        >
          <div className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center text-purple-400">
            <ListMusic className="w-3.5 h-3.5" />
          </div>
          <span>Night Drive Vibes</span>
        </Link>
        <Link
          href="/library?tab=playlists"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
        >
          <div className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center text-violet-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>Deep AMOLED Chill</span>
        </Link>
      </div>

      {/* AMOLED Quality Badge & New Playlist */}
      <div className="p-4 border-t border-[#171722] space-y-3">
        <Link
          href="/library"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-purple-600/10 hover:bg-purple-600/20 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-all"
        >
          <PlusCircle className="w-4 h-4 text-purple-400" />
          Manage Playlists
        </Link>
        <div className="bg-[#0c0c12] rounded-xl p-3 border border-zinc-800/60">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium">
            <span>Audio Engine</span>
            <span className="text-purple-400 font-bold">24-BIT Hi-Res</span>
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-full" />
          </div>
        </div>
      </div>
    </aside>
  );
};
