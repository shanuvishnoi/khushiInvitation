import React, { useState } from 'react';
import { MapPin, Navigation, Phone, ExternalLink, Car, Plane, Train, Building, Check, Copy } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { WEDDING_EVENTS, WeddingEvent } from '../data/weddingData';

export const VenueMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'grounds' | 'transit'>('map');
  const [selectedGroundZone, setSelectedGroundZone] = useState<string>('mandap');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const zones = [
    {
      id: 'gate',
      name: 'Gate 1 · Amber Royal Archway',
      purpose: 'Guest Arrival & 24/7 Valet Parking',
      description: 'Main ceremonial entrance. Security checkpoint and golf cart shuttle to inner courtyards.',
      icon: '🚗',
    },
    {
      id: 'poolside',
      name: 'Haldi venue',
      purpose: 'Ganesh Sthapana & Mehendi (Dec 12, 3 PM)',
      description: 'Surrounded by bougainvillea and carved marble arches with live henna stations and traditional high tea.',
      icon: '🌸',
    },
    {
      id: 'ballroom',
      name: 'The Royal Amber Ballroom',
      purpose: 'Sangeet & Cocktail Soirée (Dec 12, 7:30 PM)',
      description: 'Grand indoor acoustic ballroom with heritage crystal chandeliers, stage, and cocktail bar.',
      icon: '✨',
    },
    {
      id: 'orchards',
      name: 'The Sunlit Mango Orchards',
      purpose: 'Haldi & Phoolon Ki Holi (Dec 13, 10 AM)',
      description: 'Lush open-air grassy orchard beside the historic water fountains, ideal for marigold petal celebrations.',
      icon: '🌼',
    },
    {
      id: 'mandap',
      name: 'Grand Heritage Lawn & Lotus Mandap',
      purpose: 'The Baraat & Pheras (Dec 13, 5 PM)',
      description: 'Central sprawling royal lawn featuring the traditional Vedic mandap over the illuminated reflecting pool.',
      icon: '🔥',
    },
    {
      id: 'amphitheatre',
      name: 'Palace Amphitheatre & Crystal Garden',
      purpose: 'Gala Reception Banquet (Dec 14, 7 PM)',
      description: 'Tiered heritage open-air theatre for live symphony performances and royal dining.',
      icon: '👑',
    },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WEDDING_DETAILS.venue.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const activeZoneData = zones.find((z) => z.id === selectedGroundZone) || zones[4];

  return (
    <section id="venue" className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-editorial text-sm uppercase tracking-[0.25em] text-[#9A7426] font-medium mb-2">
            The Destination
          </p>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#2C241E] text-balance">
            Venues 
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5A4B] font-light max-w-lg mx-auto">
             Moradabad, Uttar Pradesh.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="mt-8 inline-flex items-center p-1 bg-white/80 rounded-full border border-[#C5A059]/30 shadow-xs">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 sm:px-6 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                activeTab === 'map'
                  ? 'bg-[#9A7426] text-white shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              Haldi &amp; Sangeet
            </button>
            <button
              onClick={() => setActiveTab('grounds')}
              className={`px-4 sm:px-6 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                activeTab === 'grounds'
                  ? 'bg-[#9A7426] text-white shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
             Mehandi
            </button>
            <button
              onClick={() => setActiveTab('transit')}
              className={`px-4 sm:px-6 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                activeTab === 'transit'
                  ? 'bg-[#9A7426] text-white shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241E]'
              }`}
            >
              Wedding 
            </button>
            
            
          </div>
        </div>

        {/* Tab 1: Interactive Map & Location */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Left: Venue Highlights Card */}
            <div className="lg:col-span-5 space-y-6 bg-white/90 p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9A7426] font-semibold">
                  Haldi Venue
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#2C241E] mt-1">
                  {WEDDING_DETAILS.venue.name}
                </h3>
                
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#5A4D41]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#9A7426] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C241E] block">Address</span>
                    <span>{WEDDING_DETAILS.venue.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#9A7426] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C241E] block">Phone</span>
                    <span>{WEDDING_DETAILS.venue.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#C5A059]/20 space-y-2.5">
                <a
                  href={WEDDING_DETAILS.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A7426] hover:bg-[#83611D] rounded-full transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href="https://maps.apple/p/N-QUL7dJoEfF~M"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 text-xs font-medium text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EEDCB9]/30 border border-[#C5A059]/30 rounded-full transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#9A7426]" />
                    <span>Apple Maps</span>
                  </a>

                  <button
                    onClick={handleCopyAddress}
                    className="flex-1 py-2.5 px-3 text-xs font-medium text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EEDCB9]/30 border border-[#C5A059]/30 rounded-full transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#9A7426]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Coordinates */}
              
            </div>

            {/* Right: Embedded Interactive Map Container */}
            <div className="lg:col-span-7 bg-white p-2 rounded-2xl border border-[#C5A059]/30 shadow-md overflow-hidden">
              <div className="relative w-full h-[380px] sm:h-[420px] rounded-xl overflow-hidden bg-[#E8E2D8]">
                {/* Embedded OpenStreetMap / Google Maps iframe */}
                <iframe
                  title="Wedding Venue Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.8753228319765!2d78.74487461612622!3d29.18928034276252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a4e9c87aaee11%3A0xe15c684f0d048b4e!2sPanoowala%2C%20Uttar%20Pradesh%20244602!5e1!3m2!1sen!2sin!4v1795086579845!5m2!1sen!2sin"
                   className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Floating badge for venue reassurance */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#C5A059]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9A7426] animate-pulse" />
                    <span className="font-semibold text-[#2C241E]"> Home, Panuwala</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Palace Grounds Interactive Layout */}
        {activeTab === 'grounds' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Left: Venue Highlights Card */}
            <div className="lg:col-span-5 space-y-6 bg-white/90 p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9A7426] font-semibold">
                   Mehandi
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#2C241E] mt-1">
                  {WEDDING_DETAILS.venue2.name}
                </h3>
                
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#5A4D41]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#9A7426] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C241E] block">Address</span>
                    <span>{WEDDING_DETAILS.venue2.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#9A7426] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C241E] block">Phone</span>
                    <span>{WEDDING_DETAILS.venue2.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#C5A059]/20 space-y-2.5">
                <a
                  href={WEDDING_DETAILS.venue2.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A7426] hover:bg-[#83611D] rounded-full transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href="https://maps.apple/p/K50ykMt67Ryowd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 text-xs font-medium text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EEDCB9]/30 border border-[#C5A059]/30 rounded-full transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#9A7426]" />
                    <span>Apple Maps</span>
                  </a>

                  <button
                    onClick={handleCopyAddress}
                    className="flex-1 py-2.5 px-3 text-xs font-medium text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EEDCB9]/30 border border-[#C5A059]/30 rounded-full transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#9A7426]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Coordinates */}
              
            </div>

            {/* Right: Embedded Interactive Map Container */}
            <div className="lg:col-span-7 bg-white p-2 rounded-2xl border border-[#C5A059]/30 shadow-md overflow-hidden">
              <div className="relative w-full h-[380px] sm:h-[420px] rounded-xl overflow-hidden bg-[#E8E2D8]">
                {/* Embedded OpenStreetMap / Google Maps iframe */}
                <iframe
                  title="Wedding Venue Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.8753228319765!2d78.74487461612622!3d29.18928034276252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a4e9c87aaee11%3A0xe15c684f0d048b4e!2sPanoowala%2C%20Uttar%20Pradesh%20244602!5e1!3m2!1sen!2sin!4v1795086579845!5m2!1sen!2sin"
                   className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Floating badge for venue reassurance */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#C5A059]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9A7426] animate-pulse" />
                    <span className="font-semibold text-[#2C241E]">MS Farm House, Bhikanpur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Travel, Transit & Accommodations */}
        {activeTab === 'transit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Left: Venue Highlights Card */}
            <div className="lg:col-span-5 space-y-6 bg-white/90 p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9A7426] font-semibold">
                  Heritage Wedding Destination
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#2C241E] mt-1">
                  {WEDDING_DETAILS.venue1.name}
                </h3>
                
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#5A4D41]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#9A7426] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C241E] block">Address</span>
                    <span>{WEDDING_DETAILS.venue1.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#9A7426] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C241E] block">Phone</span>
                    <span>{WEDDING_DETAILS.venue1.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#C5A059]/20 space-y-2.5">
                <a
                  href={WEDDING_DETAILS.venue1.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A7426] hover:bg-[#83611D] rounded-full transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href="https://maps.apple/p/QV28sfoGrCjQkY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 text-xs font-medium text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EEDCB9]/30 border border-[#C5A059]/30 rounded-full transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#9A7426]" />
                    <span>Apple Maps</span>
                  </a>

                  <button
                    onClick={handleCopyAddress}
                    className="flex-1 py-2.5 px-3 text-xs font-medium text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EEDCB9]/30 border border-[#C5A059]/30 rounded-full transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#9A7426]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Coordinates */}
              
            </div>

            {/* Right: Embedded Interactive Map Container */}
            <div className="lg:col-span-7 bg-white p-2 rounded-2xl border border-[#C5A059]/30 shadow-md overflow-hidden">
              <div className="relative w-full h-[380px] sm:h-[420px] rounded-xl overflow-hidden bg-[#E8E2D8]">
                {/* Embedded OpenStreetMap / Google Maps iframe */}
                
                <iframe
                  title="Wedding Venue Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.4297999602804!2d78.6007451!3d29.152004299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390bb25af165519b%3A0xb52b9e346cae8b7b!2sMangal%20Lipi%20Farm%20House%20Sahaspur!5e0!3m2!1sen!2sin!4v1794995192627!5m2!1sen!2sin"
                   className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Floating badge for venue reassurance */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#C5A059]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9A7426] animate-pulse" />
                    <span className="font-semibold text-[#2C241E]">Mangal Lipi Farm House, Sahaspur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
