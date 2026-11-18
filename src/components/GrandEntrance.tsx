import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

interface GrandEntranceProps {
  isLit: boolean;
  onLight: () => void;
}

// Fixed positions give each guest the same elegant shimmer without layout shifts.
const SPARKLES = Array.from({ length: 46 }, (_, i) => ({
  left: `${7 + ((i * 43 + 17) % 86)}%`,
  top: `${9 + ((i * 29 + 11) % 78)}%`,
  delay: `${(i * 0.19) % 3.8}s`,
  duration: `${2.2 + (i % 6) * 0.42}s`,
  size: `${2 + (i % 4) * 1.5}px`,
}));

/** A purely decorative, responsive Indian palace entrance, drawn without external images. */
const PalaceBackdrop: React.FC = () => (
  <svg className="grand-entrance__palace" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="palaceWall" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#28101a" />
        <stop offset=".23" stopColor="#572a30" />
        <stop offset=".5" stopColor="#261322" />
        <stop offset=".77" stopColor="#572a30" />
        <stop offset="1" stopColor="#28101a" />
      </linearGradient>
      <linearGradient id="palaceGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#9e6f37" />
        <stop offset=".25" stopColor="#f7df98" />
        <stop offset=".48" stopColor="#b48745" />
        <stop offset=".72" stopColor="#f0c877" />
        <stop offset="1" stopColor="#795126" />
      </linearGradient>
      <radialGradient id="innerPortal" cx="50%" cy="60%" r="75%">
        <stop offset="0" stopColor="#67372f" />
        <stop offset=".5" stopColor="#341b28" />
        <stop offset="1" stopColor="#120e19" />
      </radialGradient>
      <radialGradient id="litPortal" cx="50%" cy="56%" r="70%">
        <stop offset="0" stopColor="#f2ad48" stopOpacity=".62" />
        <stop offset=".52" stopColor="#bb6f40" stopOpacity=".28" />
        <stop offset="1" stopColor="#f4c061" stopOpacity="0" />
      </radialGradient>
      <pattern id="jaali" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M12 0 Q24 12 12 24 Q0 12 12 0ZM0 12H24M12 0V24" fill="none" stroke="#d4af72" strokeOpacity=".13" strokeWidth="1" />
      </pattern>
      <filter id="palaceSoftGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="12" />
      </filter>
    </defs>

    <rect width="1440" height="900" fill="url(#palaceWall)" />
    <rect width="1440" height="900" fill="url(#jaali)" opacity=".6" />

    {/* Receding palace wings and carved wall panels */}
    <path d="M0 140H335V900H0ZM1105 140H1440V900H1105Z" fill="#381b26" stroke="#986f47" strokeWidth="6" />
    <path d="M30 172H298V860H30ZM1142 172H1410V860H1142Z" fill="none" stroke="#9c7048" strokeWidth="3" />
    {[74, 196, 1244, 1366].map((x) => (
      <g key={x} opacity=".9">
        <rect x={x - 34} y="245" width="68" height="490" rx="28" fill="#4b2930" stroke="url(#palaceGold)" strokeWidth="4" />
        <rect x={x - 26} y="256" width="52" height="465" rx="22" fill="url(#jaali)" />
        <path d={`M${x - 44} 240H${x + 44}L${x + 33} 210H${x - 33}Z`} fill="url(#palaceGold)" />
        <path d={`M${x - 42} 738H${x + 42}V762H${x - 42}Z`} fill="url(#palaceGold)" />
      </g>
    ))}
    {[188, 1252].map((cx) => (
      <g key={cx}>
        <path d={`M${cx - 55} 543V390Q${cx - 55} 316 ${cx} 287Q${cx + 55} 316 ${cx + 55} 390V543Z`} fill="#1f1320" stroke="#c99c5b" strokeWidth="5" />
        <path d={`M${cx - 42} 535V400Q${cx - 42} 343 ${cx} 318Q${cx + 42} 343 ${cx + 42} 400V535Z`} fill="url(#jaali)" stroke="#946d47" strokeWidth="2" />
        <path d={`M${cx - 62} 553H${cx + 62}`} stroke="#c99c5b" strokeWidth="12" />
      </g>
    ))}

    {/* Arch with ornamental layers, like an elaborate ceremonial haveli entrance */}
    <path d="M315 900V385C315 220 428 104 570 83Q720 -46 870 83C1012 104 1125 220 1125 385V900Z" fill="#482332" stroke="#b4864f" strokeWidth="8" />
    <path d="M341 900V386C341 237 446 132 582 110Q720 -12 858 110C994 132 1099 237 1099 386V900Z" fill="none" stroke="url(#palaceGold)" strokeWidth="12" />
    <path d="M366 900V399C366 257 478 162 597 145Q720 30 843 145C962 162 1074 257 1074 399V900Z" fill="#211522" stroke="#8a603d" strokeWidth="7" />
    <path d="M393 900V406C393 293 491 201 607 177Q720 70 833 177C949 201 1047 293 1047 406V900Z" fill="url(#innerPortal)" stroke="url(#palaceGold)" strokeWidth="5" />
    <path d="M393 900V406C393 293 491 201 607 177Q720 70 833 177C949 201 1047 293 1047 406V900Z" fill="url(#litPortal)" className="grand-entrance__portal-light" />
    <path d="M412 900V422C412 309 502 226 615 202Q720 99 825 202C938 226 1028 309 1028 422V900" fill="none" stroke="#f6d995" strokeOpacity=".39" strokeWidth="2" />

    {/* Carved crown and rose-window floral motif */}
    <path d="M514 167Q720 20 926 167" fill="none" stroke="url(#palaceGold)" strokeWidth="10" />
    <path d="M570 144Q720 33 870 144" fill="none" stroke="#f4d38e" strokeWidth="3" strokeDasharray="5 13" />
    <g transform="translate(720 122)" stroke="#ebc778" fill="none" strokeWidth="2.5" opacity=".95">
      <circle r="27" /><circle r="17" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <ellipse key={a} rx="8" ry="24" transform={`rotate(${a})`} />)}
      <circle r="5" fill="#f6dc9f" />
    </g>

    {/* Toran garlands with marigold clusters */}
    <g stroke="#9b6d42" strokeWidth="3" fill="none">
      <path d="M380 292Q550 385 720 303Q890 385 1060 292" />
      <path d="M397 323Q554 402 720 324Q886 402 1043 323" />
    </g>
    {Array.from({ length: 25 }, (_, i) => {
      const x = 389 + i * 27.6;
      const y = 300 + 72 * Math.sin((i / 24) * Math.PI) ** 2;
      return <g key={i} transform={`translate(${x} ${y})`}>
        <circle r="7" fill={i % 3 === 0 ? '#c66b30' : '#e6aa46'} />
        <circle r="3" fill="#f7df8c" opacity=".8" />
        <path d="M0 6v13" stroke="#859352" strokeWidth="2" />
      </g>;
    })}
    <g fill="#dda658" opacity=".7">
      {Array.from({ length: 13 }, (_, i) => (
        <circle key={i} cx={430 + i * 49} cy={252 + 9 * Math.sin(i)} r="2.6" />
      ))}
    </g>

    {/* Ornate brass lamp sconces, progressively brighter once the diya is lit */}
    {[272, 1168].map((x) => (
      <g key={x}>
        <ellipse cx={x} cy="635" rx="32" ry="8" fill="#7f532c" />
        <path d={`M${x - 29} 627Q${x} 657 ${x + 29} 627`} fill="url(#palaceGold)" />
        <path d={`M${x} 629V690M${x - 20} 690H${x + 20}`} stroke="#d7ad66" strokeWidth="5" />
        <ellipse cx={x} cy="603" rx="26" ry="42" fill="#ffc16a" className="grand-entrance__lamp-glow" filter="url(#palaceSoftGlow)" />
        <path d={`M${x} 580Q${x - 17} 607 ${x} 622Q${x + 17} 607 ${x} 580Z`} fill="#ffdc85" className="grand-entrance__sconce-flame" />
      </g>
    ))}
    <path d="M0 864H1440V900H0Z" fill="#2a1722" />
    <path d="M0 864H1440" stroke="url(#palaceGold)" strokeWidth="4" />
  </svg>
);

export const GrandEntrance: React.FC<GrandEntranceProps> = ({ isLit, onLight }) => {
  const [announcement, setAnnouncement] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isLit) return;
    timerRef.current = setTimeout(() => setAnnouncement(true), 650);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isLit]);

  const enterInvitation = () => {
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="welcome" className={`grand-entrance ${isLit ? 'grand-entrance--lit' : ''}`} aria-label="The grand entrance to Pratha and Abhinav's wedding invitation">
      <div className="grand-entrance__backlight" aria-hidden="true" />
      <PalaceBackdrop />
      <div className="grand-entrance__light-sweep" aria-hidden="true" />
      <div className="grand-entrance__vignette" aria-hidden="true" />
      <div className="grand-entrance__floor" aria-hidden="true" />
      <div className="grand-entrance__sparks" aria-hidden="true">
        {SPARKLES.map((sparkle, i) => (
          <span key={i} className="grand-entrance__spark" style={{ left: sparkle.left, top: sparkle.top, animationDelay: sparkle.delay, animationDuration: sparkle.duration, width: sparkle.size, height: sparkle.size }} />
        ))}
      </div>

      <div className="grand-entrance__foreground">
        <div className={`grand-entrance__message ${announcement ? 'grand-entrance__message--shown' : ''}`} aria-live="polite">
          {isLit ? (
            <>
              <p className="grand-entrance__eyebrow">✧ &nbsp; With love and blessings &nbsp; ✧</p>
              <p className="grand-entrance__welcome">Welcome to the wedding of</p>
              <h1 className="grand-entrance__names">{WEDDING_DETAILS.couple.bride} <span>&amp;</span> {WEDDING_DETAILS.couple.groom}</h1>
              <p className="grand-entrance__date">  Moradabad</p>
            </>
          ) : (
            <>
              <p className="grand-entrance__eyebrow">ॐ श्री गणेशाय नमः</p>
              <h1 className="grand-entrance__pretitle">A celebration awaits</h1>
              <p className="grand-entrance__pretext">One little flame begins a lifetime of light</p>
            </>
          )}
        </div>

        <div className="grand-entrance__diya-wrap">
          <button
            type="button"
            className="grand-entrance__diya"
            onClick={onLight}
            disabled={isLit}
            aria-label={isLit ? 'The welcome diya is lit' : 'Light the diya to illuminate the entrance and start the wedding song'}
            title={isLit ? 'The diya is glowing' : 'Tap to light the diya'}
          >
            <span className="grand-entrance__diya-halo" aria-hidden="true" />
            <span className="grand-entrance__diya-flame" aria-hidden="true">
              <span className="grand-entrance__flame-inner" />
            </span>
            <span className="grand-entrance__diya-rim" aria-hidden="true" />
            <span className="grand-entrance__diya-bowl" aria-hidden="true"><span className="grand-entrance__bowl-jewel" /></span>
            <span className="grand-entrance__diya-base" aria-hidden="true" />
          </button>
          <p className="grand-entrance__diya-hint">
            {isLit ? <><Sparkles size={14} /> The light of our celebration</> : <>✦ &nbsp; Tap the diya to light our celebration &nbsp; ✦</>}
          </p>
        </div>

        {isLit && (
          <button type="button" className="grand-entrance__scroll" onClick={enterInvitation} aria-label="Scroll to the wedding invitation">
            <span>Scroll to enter our celebration</span>
            <ArrowDown size={20} strokeWidth={1.5} className="grand-entrance__scroll-arrow" />
          </button>
        )}
      </div>
      <div className="grand-entrance__corner grand-entrance__corner--left" aria-hidden="true">❦</div>
      <div className="grand-entrance__corner grand-entrance__corner--right" aria-hidden="true">❦</div>
    </section>
  );
};
