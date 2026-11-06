'use client';

import React from 'react';
import { Genre } from '@/lib/catalogue';

export const GenreCard: React.FC<{ genre: Genre; onClick?: () => void }> = ({ genre, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-28 rounded-2xl overflow-hidden p-4 flex flex-col justify-between cursor-pointer border border-zinc-800/60 hover:scale-[1.02] transition-all shadow-md"
      style={{
        background: `linear-gradient(135deg, ${genre.accent_color}33 0%, #0c0c14 100%)`,
      }}
    >
      <div className="absolute right-0 bottom-0 w-24 h-24 overflow-hidden rounded-br-2xl rotate-[20deg] translate-x-3 translate-y-3 opacity-70 group-hover:opacity-95 group-hover:scale-110 transition-all duration-300">
        <img src={genre.image_url} alt="" className="w-full h-full object-cover shadow-2xl" />
      </div>

      <div className="relative z-10">
        <h4 className="text-base font-bold text-white tracking-wide">{genre.name}</h4>
      </div>

      <div className="relative z-10 flex items-center gap-1.5 text-[11px] font-semibold text-purple-300">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: genre.accent_color }} />
        <span>Explore vibes</span>
      </div>
    </div>
  );
};
