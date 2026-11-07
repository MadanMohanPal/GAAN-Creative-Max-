'use client';

import React, { useState } from 'react';
import { Song } from '@/lib/catalogue';
import { usePlayer } from './PlayerContext';
import { Play, Pause, Heart, Download, Check } from 'lucide-react';

interface SongCardProps {
  song: Song;
  playlistContext?: Song[];
}

export const SongCard: React.FC<SongCardProps> = ({ song, playlistContext }) => {
  const { currentSong, isPlaying, playSong, togglePlay, likedSongIds, toggleLike, downloadSong, downloadedSongs } = usePlayer();
  const [isDownloading, setIsDownloading] = useState(false);

  const isCurrent = currentSong?.id === song.id;
  const isLiked = likedSongIds.has(song.id);
  const isDownloaded = downloadedSongs.some(s => s.id === song.id);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, playlistContext);
    }
  };

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    await downloadSong(song);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div
      onClick={() => playSong(song, playlistContext)}
      className="group relative bg-[#0e0e15]/70 hover:bg-[#161622] p-3.5 rounded-2xl border border-zinc-900/80 hover:border-purple-900/60 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Artwork container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-zinc-950">
        <img
          src={song.cover_url}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Play/Pause overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
            isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <button
            onClick={handlePlayClick}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white flex items-center justify-center shadow-lg shadow-purple-900/60 hover:scale-110 active:scale-95 transition-transform"
          >
            {isCurrent && isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Top-right: Like button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song.id);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-black/90 transition-all text-white"
          title={isLiked ? 'Unlike' : 'Like'}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-zinc-300'}`} />
        </button>

        {/* Top-left: One-Click Download button */}
        <button
          onClick={handleDownloadClick}
          className={`absolute top-2.5 left-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
            isDownloaded
              ? 'bg-emerald-600/90 text-white opacity-100'
              : 'bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 hover:bg-purple-600 hover:text-white'
          }`}
          title={isDownloaded ? 'Downloaded Offline' : '1-Click Download MP3'}
        >
          {isDownloading ? (
            <span className="w-3.5 h-3.5 block animate-spin text-[10px]">⏳</span>
          ) : isDownloaded ? (
            <Check className="w-3.5 h-3.5 text-white" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <h4 className={`text-sm font-semibold truncate ${isCurrent ? 'text-purple-400' : 'text-white'}`}>
          {song.title}
        </h4>
        <p className="text-xs text-zinc-400 truncate mt-0.5">{song.artist_name}</p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-900/40 text-[11px] text-zinc-500">
          <span className="font-mono">{Math.floor(song.duration_seconds / 60)}:{String(song.duration_seconds % 60).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-bold text-purple-400/80">{song.language}</span>
        </div>
      </div>
    </div>
  );
};
