'use client';

import React from 'react';
import { Album } from '@/lib/catalogue';

export const AlbumCard: React.FC<{ album: Album }> = ({ album }) => {
  return (
    <div className="group bg-[#0e0e15]/70 hover:bg-[#161622] p-3.5 rounded-2xl border border-zinc-900/80 hover:border-purple-900/60 transition-all duration-300 cursor-pointer">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-zinc-950">
        <img
          src={album.cover_url}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase text-purple-300">
          {album.type}
        </div>
      </div>
      <h4 className="text-sm font-semibold text-white truncate">{album.title}</h4>
      <p className="text-xs text-zinc-400 truncate mt-0.5">{album.artist_name}</p>
      <div className="text-[11px] text-zinc-500 mt-1">{album.total_tracks} tracks • {album.release_date.slice(0, 4)}</div>
    </div>
  );
};
