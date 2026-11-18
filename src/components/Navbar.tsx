import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC<{ hideUntilInvitation?: boolean }> = ({ hideUntilInvitation = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastEntrance, setPastEntrance] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const entrance = document.getElementById('welcome');
      setPastEntrance(!entrance || entrance.getBoundingClientRect().bottom <= 90);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleScroll); };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${hideUntilInvitation && !pastEntrance ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 translate-y-0'} ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#C5A059]/20 shadow-sm py-3'
            : 'bg-[#FAF7F2]/80 backdrop-blur-sm border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: Zone 1, Zone 2, Zone 3 separated by gap-8 */}
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark (Single text element in serif display face) */}
            <a
              href="#"
              className="text-2xl sm:text-3xl font-display font-medium text-[#2C241E] hover:text-[#9A7426] transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              Pratha &amp; Abhinav
            </a>

            {/* Zone 2: 4-5 concise single-line nav links */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest text-[#5A4D41]">
              <a
                href="#itinerary"
                className="hover:text-[#9A7426] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Itinerary
              </a>
              <a
                href="#roka"
                className="hover:text-[#9A7426] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Roka Photos
              </a>
              <a
                href="#venue"
                className="hover:text-[#9A7426] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Venue &amp; Map
              </a>
              <a
                href="#guestbook"
                className="hover:text-[#9A7426] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                Wishes
              </a>
            </nav>

            {/* Mobile navigation toggle */}
            <div className="flex items-center gap-3 shrink-0">

              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#5A4D41] hover:text-[#2C241E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-lg"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute top-16 left-0 right-0 bg-[#FAF7F2] border-b border-[#C5A059]/30 p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-3 text-center text-sm font-semibold uppercase tracking-widest text-[#5A4D41]">
              <a
                href="#itinerary"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-[#9A7426] border-b border-[#E8D7B8]/40"
              >
                Itinerary
              </a>
              <a
                href="#roka"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-[#9A7426] border-b border-[#E8D7B8]/40"
              >
                Roka Photos
              </a>
              <a
                href="#venue"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-[#9A7426] border-b border-[#E8D7B8]/40"
              >
                Venue &amp; Map
              </a>
              <a
                href="#guestbook"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 hover:text-[#9A7426]"
              >
                Wishes &amp; Blessings
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
