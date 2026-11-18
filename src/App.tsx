import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GrandEntrance } from './components/GrandEntrance';
import { Itinerary } from './components/Itinerary';
import { ScratchTheDate } from './components/ScratchTheDate';
import { RokaGallery } from './components/RokaGallery';
import { VenueMap } from './components/VenueMap';
import { MusicPlayer, type MusicPlayerHandle } from './components/MusicPlayer';
import { PetalShower } from './components/PetalShower';
import { Footer } from './components/Footer';

export default function App() {
  const [entranceLit, setEntranceLit] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  // Begin each visit at the grand entrance, even after a browser page refresh.
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Keep the opening reveal in view until a guest lights the diya.
  useEffect(() => {
    if (entranceLit) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [entranceLit]);

  const lightDiya = () => {
    if (entranceLit) return;
    // The audio starts on this same user click, satisfying browser autoplay policies.
    musicPlayerRef.current?.play();
    setEntranceLit(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-[#E8D7B8] selection:text-[#3D2C1D]">
      <GrandEntrance isLit={entranceLit} onLight={lightDiya} />

      {/* The original wedding invitation follows the entrance when visitors scroll. */}
      <div id="invitation">
        {entranceLit && <PetalShower />}
        <Navbar hideUntilInvitation />
        <MusicPlayer ref={musicPlayerRef} showControls={entranceLit} />

        <main>
          <ScratchTheDate />
          <Hero />
          
          <Itinerary />
          <RokaGallery />
          <VenueMap />
        </main>

        <Footer />
      </div>
    </div>
  );
}
