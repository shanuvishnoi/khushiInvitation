import React from 'react';
import { Heart, ArrowUp, Phone, Mail, Instagram } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#211A15] text-[#E8D7B8] pt-16 pb-12 border-t border-[#C5A059]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="font-editorial text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C5A059] font-medium">
            With Love &amp; Gratitude
          </p>

          <h3 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-wide">
            Pratha &amp; Abhinav
          </h3>

          <p className="text-xs sm:text-sm text-[#BDB09E] leading-relaxed font-light">
            We are deeply grateful for your presence, prayers, and heartfelt blessings as we begin our lifelong journey together.
          </p>

          {/* Family Names */}
          <div className="pt-4 pb-2 border-y border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#D8C7AF]">
            <div>
              <span className="text-[11px] text-[#A6957F] uppercase tracking-wider block">Bride&apos;s Family</span>
              <span className="font-medium text-white">{WEDDING_DETAILS.couple.parentsBride}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#A6957F] uppercase tracking-wider block">Groom&apos;s Family</span>
              <span className="font-medium text-white">{WEDDING_DETAILS.couple.parentsGroom}</span>
            </div>
          </div>

          {/* Wedding Hashtag & Helpline */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#C5A059]">
            <span className="font-editorial text-sm font-semibold tracking-wider">
              {WEDDING_DETAILS.couple.hashtag}
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <a
              href={`tel:${WEDDING_DETAILS.venue.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact: {WEDDING_DETAILS.venue.phone}</span>
            </a>
          </div>

          {/* Project ZIP Download & Scroll to Top */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-3">

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs text-[#BDB09E] hover:text-white hover:border-[#C5A059] transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          <div className="pt-8 text-[11px] text-white/40 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 Pratha &amp; Abhinav Wedding Celebration</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" /> in Moradabad, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
