import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Star, Heart, Briefcase, Coins, Share2, Check } from 'lucide-react';
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getZodiacSign } from './utils/zodiac';
import { getDailyFortune } from './services/geminiService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [birthday, setBirthday] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fortune, setFortune] = useState<string | null>(null);
  const [zodiac, setZodiac] = useState<{ name: string; icon: string; symbol: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (!fortune) return;
    navigator.clipboard.writeText(fortune);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDivine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthday) return;

    setLoading(true);
    setFortune(null);
    
    const date = new Date(birthday);
    const sign = getZodiacSign(date);
    setZodiac(sign);

    try {
      const result = await getDailyFortune(sign.name, birthday);
      setFortune(result);
    } catch (error) {
      console.error('Divination failed:', error);
      setFortune('星象紊乱，无法窥见天机。请检查网络或稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 md:py-24">
      {/* Background Stars Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl text-center space-y-8"
      >
        <header className="space-y-4">
          <motion.div 
            className="inline-block p-3 rounded-2xl glass animate-float"
          >
            <Sparkles className="w-8 h-8 text-purple-400" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter text-gradient">
            星运占卜
          </h1>
          <p className="text-zinc-400 text-lg font-light tracking-wide">
            窥探星辰的低语，开启你的每日启示录
          </p>
        </header>

        <form onSubmit={handleDivine} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Calendar className="w-5 h-5 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !birthday}
            className={cn(
              "w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300",
              "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
              "shadow-lg shadow-purple-500/20 active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            )}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                正在解读星象...
              </span>
            ) : (
              "开启今日运势"
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {fortune && zodiac && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8 text-left"
            >
              <div className="glass rounded-3xl p-8 space-y-6 relative overflow-hidden">
                {/* Zodiac Badge */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl bg-purple-500/20 w-20 h-20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                    {zodiac.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold">{zodiac.name}</h2>
                    <p className="text-purple-400 uppercase tracking-widest text-sm">{zodiac.symbol}</p>
                  </div>
                  <div className="ml-auto text-zinc-500 text-sm">
                    {format(new Date(), 'yyyy.MM.dd')}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-headings:text-white prose-strong:text-purple-300">
                  <Markdown>{fortune}</Markdown>
                </div>

                {/* Share Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-colors text-sm text-zinc-400 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>已复制</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>分享启示</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                  <Star className="w-40 h-40" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={<Heart className="w-4 h-4" />} label="爱情" />
                <StatCard icon={<Briefcase className="w-4 h-4" />} label="事业" />
                <StatCard icon={<Coins className="w-4 h-4" />} label="财富" />
                <StatCard icon={<Star className="w-4 h-4" />} label="整体" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="mt-auto pt-12 text-zinc-600 text-sm tracking-widest uppercase">
        © {new Date().getFullYear()} 星运启示录 · Cosmic Oracle
      </footer>
    </div>
  );
}

function StatCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-col items-center gap-2">
      <div className="text-purple-400">{icon}</div>
      <span className="text-xs text-zinc-500 font-medium">{label}</span>
    </div>
  );
}

