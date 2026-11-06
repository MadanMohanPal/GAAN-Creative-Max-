'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      router.push('/');
    } else {
      // Demo guest login mode
      setTimeout(() => {
        router.push('/');
      }, 500);
    }
  };

  const handleGuestDemo = () => {
    router.push('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a0a0f] p-8 rounded-3xl border border-zinc-900 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 p-0.5 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-xl text-purple-400">G</span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white">Sign In to GAAN</h1>
          <p className="text-xs text-zinc-400 mt-1">Unlock your personalized AMOLED audio space</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-300 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                required
                className="w-full bg-[#12121c] border border-zinc-800 text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#12121c] border border-zinc-800 text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-purple-glow flex items-center justify-center gap-2 transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-[1px] bg-zinc-900 flex-1" />
          <span className="text-[11px] text-zinc-600 uppercase">Or</span>
          <div className="h-[1px] bg-zinc-900 flex-1" />
        </div>

        <button
          onClick={handleGuestDemo}
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs border border-zinc-800 flex items-center justify-center gap-2 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Continue as Instant Guest
        </button>

        <p className="text-center text-xs text-zinc-500 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-400 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
