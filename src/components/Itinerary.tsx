import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Shirt, ChevronRight } from 'lucide-react';
import { WEDDING_EVENTS, WeddingEvent } from '../data/weddingData';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const Itinerary: React.FC = () => {
  const [activeDayFilter, setActiveDayFilter] = useState<'all' | 'day1' | 'day2' | 'day3'>('all');
  const [selectedEventModal, setSelectedEventModal] = useState<WeddingEvent | null>(null);

  const filteredEvents = WEDDING_EVENTS.filter((event) => {
    if (activeDayFilter === 'all') return true;
    if (activeDayFilter === 'day1') return event.date.includes('December 9');
    if (activeDayFilter === 'day2') return event.date.includes('December 10');
    if (activeDayFilter === 'day3') return event.date.includes('December 11');
    return true;
  });

  return (
    <section id="itinerary" className="py-20 bg-gradient-to-b from-[#FAF7F2] to-[#F5EFE6] border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-editorial text-sm uppercase tracking-[0.2em] text-[#9A7426] font-medium mb-2">
            Wedding Itinerary
          </p>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#2C241E] text-balance">
            Celebration of Auspicious Ceremonies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5A4B] font-light">
            A beautiful beginning to our forever, surrounded by sacred blessings, timeless traditions, and the warmth of our loved ones.
          </p>

          {/* Interactive Day Filter Tabs (Segmented control) */}
          <div className="mt-8 inline-flex items-center p-1 bg-white/80 rounded-full border border-[#C5A059]/30 shadow-xs">
            <button
              onClick={() => setActiveDayFilter('all')}
              className={`px-4 sm:px-5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                activeDayFilter === 'all'
                  ? 'bg-[#9A7426] text-white shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveDayFilter('day1')}
              className={`px-4 sm:px-5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                activeDayFilter === 'day1'
                  ? 'bg-[#9A7426] text-white shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              Day 1 · Dec 09
            </button>
            <button
              onClick={() => setActiveDayFilter('day2')}
              className={`px-4 sm:px-5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                activeDayFilter === 'day2'
                  ? 'bg-[#9A7426] text-white shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              Day 2 · Dec 10
            </button>
            <button
              onClick={() => setActiveDayFilter('day3')}
              className={`px-4 sm:px-5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                activeDayFilter === 'day3'
                  ? 'bg-[#9A7426] text-white shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              Day 3 · Dec 11
            </button>
          </div>
        </div>

        {/* Timeline Event Cards */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredEvents.map((event, idx) => (
            <div
              key={event.id}
              className="bg-white/90 rounded-2xl border border-[#C5A059]/30 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle gold accent corner pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#EEDCB9]/30 to-transparent pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  {/* Clean unboxed metadata (Zero-Pill discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#8C7A6B] font-medium tracking-wide">
                    <span className="text-[#9A7426] font-semibold">0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{event.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#9A7426]" />
                      {event.time}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#2C241E]">
                      {event.name}
                    </h3>
                    <p className="text-sm text-[#9A7426] font-editorial italic mt-0.5">
                      {event.subTitle}
                    </p>
                  </div>

                  <p className="text-sm text-[#5A4D41] leading-relaxed">
                    {event.description}
                  </p>

                  {/* Highlights and Venue */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-[#4A3E34]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#9A7426] shrink-0" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="hidden sm:block text-[#C5A059]/40">·</div>
                    
                  </div>
                  {/* Dress Code Section with color swatches */}
                  <div className="pt-3 border-t border-[#C5A059]/20 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#5A4D41]">
                      <Shirt className="w-3.5 h-3.5 text-[#9A7426]" />
                      <span className="font-semibold text-[#3D2C1D]">Attire:</span>
                      <span>{event.dressCode}</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                      <span className="text-[11px] text-[#8C7A6B]">Palette:</span>
                      <div className="flex items-center gap-1">
                        {event.dressColorPalette.map((color, colorIdx) => (
                          <span
                            key={colorIdx}
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shadow-2xs"
                            style={{ backgroundColor: color }}
                            title={`Recommended shade ${colorIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  
                </div>

                {/* Right Action Buttons */}
                <div className="flex md:flex-col items-center gap-2.5 shrink-0 pt-2 md:pt-0">
                  <a
                    href={getGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none w-full px-4 py-2 text-xs font-medium text-[#2C241E] bg-white hover:bg-[#FAF7F2] border border-[#C5A059]/40 rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-2xs whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#9A7426]" />
                    <span>Google Cal</span>
                  </a>
                  <button
                    onClick={() => downloadIcsFile(event)}
                    className="flex-1 md:flex-none w-full px-4 py-2 text-xs font-medium text-[#5A4D41] hover:text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EEDCB9]/30 rounded-full transition-colors whitespace-nowrap text-center"
                  >
                    .ICS File
                  </button>
                  <button
                    onClick={() => setSelectedEventModal(event)}
                    className="p-2 text-[#9A7426] hover:bg-[#EEDCB9]/30 rounded-full transition-colors hidden md:block"
                    title="View Ceremony Details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setSelectedEventModal(null)}
        >
          <div
            className="bg-[#FAF7F2] max-w-lg w-full rounded-2xl border border-[#C5A059] p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-4 right-4 text-[#8C7A6B] hover:text-[#2C241E] p-1.5 text-lg font-bold"
              aria-label="Close Modal"
            >
              ✕
            </button>

            <span className="text-xs uppercase tracking-widest text-[#9A7426] font-semibold">
              Ceremony Guide
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#2C241E] mt-1">
              {selectedEventModal.name}
            </h3>
            <p className="text-sm font-editorial italic text-[#8C7A6B] mb-4">
              {selectedEventModal.subTitle}
            </p>

            <div className="space-y-3 text-sm text-[#5A4D41] mb-6">
              <p>{selectedEventModal.description}</p>
              
              <div className="p-3.5 bg-white/80 rounded-xl border border-[#C5A059]/20 space-y-2 text-xs">
                <div>
                  <strong className="text-[#2C241E]">When:</strong> {selectedEventModal.date} ({selectedEventModal.time})
                </div>
                <div>
                  <strong className="text-[#2C241E]">Where:</strong> {selectedEventModal.location}
                </div>
              
                <div>
                  <strong className="text-[#2C241E]">Key Ritual:</strong> {selectedEventModal.highlight}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={getGoogleCalendarUrl(selectedEventModal)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#9A7426] hover:bg-[#83611D] rounded-full transition-colors"
              >
                Add to Calendar
              </a>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#5A4D41] bg-white border border-[#C5A059]/30 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
