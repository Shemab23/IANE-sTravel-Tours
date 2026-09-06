import React, { useState, useEffect } from 'react';
import { Compass, Sparkles } from 'lucide-react';

export const BrandMomentSection: React.FC = () => {
  const words = ['DISCOVER', 'EXPLORE', 'CONNECT', 'TRAVEL', 'CONQUER THE WORLD'];
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section className="relative py-28 md:py-36 bg-[#0B2A4A] text-white overflow-hidden">
      {/* Background imagery texture with low opacity */}
      <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80"
          alt="East Africa Safari horizon"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#3FA9DD]/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-widest uppercase text-[#7EC8E3] mb-8 border border-white/10">
          <Compass className="w-3.5 h-3.5" />
          <span>The IAN'S Spirit</span>
        </div>

        {/* Word Sequence Display */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8">
          {words.map((word, idx) => {
            const isCurrent = activeWordIndex === idx;
            const isLast = idx === words.length - 1;
            return (
              <React.Fragment key={word}>
                <span
                  className={`text-lg sm:text-2xl md:text-3xl font-black font-heading transition-all duration-500 cursor-pointer ${
                    isCurrent
                      ? isLast
                        ? 'text-[#C7A15A] scale-110 drop-shadow-[0_0_15px_rgba(199,161,90,0.5)]'
                        : 'text-[#7EC8E3] scale-105'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                  onClick={() => setActiveWordIndex(idx)}
                >
                  {word}
                </span>
                {idx < words.length - 1 && (
                  <span className="text-white/20 text-lg hidden sm:inline">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Big Spotlight Headline */}
        <div className="h-20 sm:h-24 flex items-center justify-center">
          <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
            {words[activeWordIndex] === 'CONQUER THE WORLD' ? (
              <span className="text-[#C7A15A] flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-[#C7A15A]" />
                <span>Conquer the world with us!</span>
              </span>
            ) : (
              <span>Begin Your Voyage.</span>
            )}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-4 leading-relaxed">
          From Rwanda to the horizons of Africa and worldwide destinations, we empower curious minds, busy executives, and adventurous families to travel with quiet confidence.
        </p>
      </div>
    </section>
  );
};
