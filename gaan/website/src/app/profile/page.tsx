'use client';

import React, { useState } from 'react';
import { User, Shield, Sliders, Volume2, HardDrive, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [quality, setQuality] = useState<'normal' | 'high' | 'lossless'>('high');
  const [themeMode, setThemeMode] = useState<'amoled' | 'purple'>('amoled');
  const [normalizeVol, setNormalizeVol] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0a0a0f] border border-zinc-900 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 p-1">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <User className="w-10 h-10 text-purple-400" />
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black text-white">Guest Auditor</h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 text-[10px] font-bold border border-purple-700/50">
              GAAN PASS
            </span>
          </div>
          <p className="text-sm text-zinc-400 mt-1">guest@gaan.audio • Member since Nov 2026</p>
          <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-zinc-400 font-mono">
            <span>🎧 142 Tracks Played</span>
            <span>❤️ 12 Favorites</span>
            <span>⚡ 3.8 GB Cached</span>
          </div>
        </div>
      </div>

      {/* Audio Streaming Preferences */}
      <section className="p-6 rounded-3xl bg-[#0c0c14] border border-zinc-900 space-y-6">
        <div className="flex items-center gap-3">
          <Sliders className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Playback & Audio Engine</h2>
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
            Streaming Bitrate Quality
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'normal', title: 'Normal (160 kbps)', desc: 'Optimized data usage' },
              { id: 'high', title: 'High (320 kbps)', desc: 'Crisp studio audio' },
              { id: 'lossless', title: 'Lossless Hi-Res', desc: '24-bit 96kHz Master' },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setQuality(opt.id as any)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  quality === opt.id
                    ? 'bg-purple-950/60 border-purple-500 shadow-purple-glow text-white'
                    : 'bg-[#11111a] border-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">{opt.title}</span>
                  {quality === opt.id && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </div>
                <p className="text-xs text-zinc-500">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-zinc-900">
          <div>
            <h4 className="text-sm font-semibold text-white">Volume Normalization</h4>
            <p className="text-xs text-zinc-500">Prevent abrupt volume jumps between different songs.</p>
          </div>
          <button
            onClick={() => setNormalizeVol(!normalizeVol)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              normalizeVol ? 'bg-purple-600' : 'bg-zinc-800'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                normalizeVol ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </section>

      {/* AMOLED Theme Configuration */}
      <section className="p-6 rounded-3xl bg-[#0c0c14] border border-zinc-900 space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Display & Theme</h2>
        </div>
        <p className="text-xs text-zinc-400">
          GAAN is natively tuned for zero pixel bleed on OLED / AMOLED panels.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setThemeMode('amoled')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              themeMode === 'amoled'
                ? 'bg-purple-600 border-purple-400 text-white shadow-purple-glow'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            True AMOLED Pure Black (#000000)
          </button>
          <button
            onClick={() => setThemeMode('purple')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              themeMode === 'purple'
                ? 'bg-purple-600 border-purple-400 text-white shadow-purple-glow'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            Midnight Violet Tint
          </button>
        </div>
      </section>

      {/* Creative Max Engineering Credit */}
      <section className="p-6 rounded-3xl bg-gradient-to-r from-[#170e2b] via-[#0f0c1c] to-[#08080f] border border-purple-800/40 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
              Architecture & Production Credits
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">Designed & Developed by Creative Max</h3>
            <p className="text-xs text-zinc-400 mt-1">
              GAAN Music Ecosystem • High-Fidelity Streaming Engine & AMOLED Dark Architecture
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-black text-xs text-white shadow-purple-glow">
            Creative Max
          </div>
        </div>
      </section>
    </div>
  );
}
