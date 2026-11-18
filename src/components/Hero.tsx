import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Clock } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { getAllEventsGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Hero: React.FC = () => {
  const [showCalOptions, setShowCalOptions] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(WEDDING_DETAILS.dates.countdownTarget).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EEDCB9]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sanskrit Auspicious Invocation Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="font-editorial text-sm sm:text-base text-[#9A7426] tracking-widest uppercase mb-1">
            || श्री गणेशाय नमः ||
          </p>
          <p className="font-editorial text-xs sm:text-sm text-[#7D6B58] italic max-w-lg mx-auto">
            {WEDDING_DETAILS.couple.sanskritShlok}
          </p>
          <div className="w-16 h-px bg-[#C5A059]/40 mx-auto mt-3" />
        </div>

        {/* 2-Column Desktop Split: Typography on Left, Hero Visual Container on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8C7A6B] font-medium block">
                Together With Their Families
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-medium text-[#2C241E] leading-[1.08] tracking-tight text-balance">
                Pratha <span className="font-script text-4xl sm:text-6xl text-[#9A7426] font-normal">&amp;</span> Abhinav
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#5A4D41] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Invite you to grace the joyful auspicious celebration of their wedding. Join us under Moradabad&apos;s starlit skies for three days of melody, sacred rituals, and lifelong memories.
            </p>
            

            {/* Date & Location Details */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 text-xs sm:text-sm text-[#4A3E34]">
              
               <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#9A7426] shrink-0" />
                <span className="font-medium">{WEDDING_DETAILS.dates.display}</span>
              </div>
              <div className="hidden sm:block text-[#C5A059]/60">·</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9A7426] shrink-0" />
                <span className="font-medium">Mangal Lipi Farm House· Sahaspur</span>
              </div>
            </div>

            {/* Live Countdown Clock */}
            <div className="pt-4 pb-2">
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-white/70 border border-[#C5A059]/30 shadow-xs backdrop-blur-xs">
                <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-[#8C7A6B] font-medium justify-center lg:justify-start">
                  <Clock className="w-3.5 h-3.5 text-[#9A7426]" />
                  <span>The Auspicious Countdown</span>
                </div>
                <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
                  <div className="min-w-[60px]">
                    <span className="block text-2xl sm:text-3xl font-display font-semibold text-[#2C241E] tabular-nums">
                      {timeLeft.days}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#7D6B58]">Days</span>
                  </div>
                  <div className="min-w-[60px]">
                    <span className="block text-2xl sm:text-3xl font-display font-semibold text-[#2C241E] tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#7D6B58]">Hours</span>
                  </div>
                  <div className="min-w-[60px]">
                    <span className="block text-2xl sm:text-3xl font-display font-semibold text-[#2C241E] tabular-nums">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#7D6B58]">Mins</span>
                  </div>
                  <div className="min-w-[60px]">
                    <span className="block text-2xl sm:text-3xl font-display font-semibold text-[#2C241E] tabular-nums">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#7D6B58]">Secs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">

              <div className="relative">
                <button
                  onClick={() => setShowCalOptions(!showCalOptions)}
                  className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2C241E] bg-white hover:bg-[#FAF7F2] border border-[#C5A059]/40 active:scale-[0.98] rounded-full transition-all shadow-2xs whitespace-nowrap flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#9A7426]" />
                  <span>Save to Calendar</span>
                </button>

                {showCalOptions && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-[#C5A059]/30 p-2 z-20 text-left">
                    <a
                      href={getAllEventsGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-xs font-medium text-[#2C241E] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                      onClick={() => setShowCalOptions(false)}
                    >
                      Add to Google Calendar
                    </a>
                    <button
                      onClick={() => {
                        downloadIcsFile();
                        setShowCalOptions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#2C241E] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                    >
                      Download .ICS File (Apple / Outlook)
                    </button>
                  </div>
                )}
              </div>

              <a
                href="#itinerary"
                className="text-xs uppercase tracking-widest text-[#7D6B58] hover:text-[#9A7426] transition-colors py-2 px-3 underline underline-offset-4 decoration-[#C5A059]/40 hover:decoration-[#9A7426]"
              >
                View Itinerary
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-[3/4] p-3 rounded-t-[140px] rounded-b-2xl bg-gradient-to-b from-[#EEDCB9]/40 to-white/80 border border-[#C5A059]/40 shadow-xl">
              {/* Decorative inner arch border */}
              <div className="relative w-full h-full rounded-t-[130px] rounded-b-xl overflow-hidden bg-[#FAF7F2]">
                <img
                  src="/src/assets/images/ghibli.png"
                  alt="Pratha and Abhinav wedding portrait"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                  <div className="text-white">
                    <p className="font-display text-lg tracking-wide">Pratha &amp; Abhinav</p>
                    <p className="text-xs text-white/80 font-light">Moradabad · December 2026</p>
                  </div>
                </div>
              </div>

              {/* Floating gold stamp badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#FAF7F2] border border-[#C5A059] p-3 rounded-full shadow-lg flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-dashed border-[#C5A059] flex items-center justify-center text-center">
                  <Heart className="w-5 h-5 text-[#9A7426] fill-[#9A7426]/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
