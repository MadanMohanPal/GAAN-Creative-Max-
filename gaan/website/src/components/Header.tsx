'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, User, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="h-16 px-6 bg-[#000000]/80 backdrop-blur-md border-b border-[#14141c] flex items-center justify-between sticky top-0 z-10 select-none">
      {/* Navigation history controls & Search bar */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="flex items-center gap-1.5 hidden md:flex">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center transition-colors"
            title="Go back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.forward()}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center transition-colors"
            title="Go forward"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search songs, albums, artists, or genres..."
            className="w-full bg-[#101016] text-white text-sm pl-10 pr-4 py-2 rounded-full border border-zinc-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-zinc-500"
          />
        </form>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/explore"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 text-xs font-semibold border border-purple-800/40 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>AMOLED Flow</span>
        </Link>

        <button className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        <Link
          href="/profile"
          className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-[#12121a] hover:bg-[#1a1a24] border border-zinc-800 text-white transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium">Guest User</span>
        </Link>
      </div>
    </header>
  );
};
