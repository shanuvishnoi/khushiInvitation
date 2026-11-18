import React, { useState } from 'react';
import { Flower } from 'lucide-react';

export const PetalShower: React.FC = () => {
  const [isActive, setIsActive] = useState(true);

  // 12 subtle falling petals with staggered positions, delays and durations
  const petals = [
    { id: 1, left: '5%', delay: '0s', duration: '14s', size: '14px', color: '#F59E0B', rot: '25deg' },
    { id: 2, left: '15%', delay: '4s', duration: '16s', size: '12px', color: '#FB7185', rot: '45deg' },
    { id: 3, left: '28%', delay: '2s', duration: '13s', size: '16px', color: '#FBBF24', rot: '80deg' },
    { id: 4, left: '42%', delay: '7s', duration: '18s', size: '11px', color: '#FDA4AF', rot: '15deg' },
    { id: 5, left: '55%', delay: '1s', duration: '15s', size: '15px', color: '#F59E0B', rot: '60deg' },
    { id: 6, left: '68%', delay: '5s', duration: '17s', size: '13px', color: '#F43F5E', rot: '90deg' },
    { id: 7, left: '79%', delay: '3s', duration: '14s', size: '12px', color: '#FBBF24', rot: '35deg' },
    { id: 8, left: '90%', delay: '6s', duration: '16s', size: '15px', color: '#FB7185', rot: '70deg' },
  ];

  return (
    <>
      {/* Falling Flower Petals Layer */}
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
          {petals.map((p) => (
            <div
              key={p.id}
              className="absolute animate-petal"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                top: '-20px',
              }}
            >
              <div
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  borderRadius: '100% 0% 100% 0%',
                  transform: `rotate(${p.rot})`,
                  opacity: 0.65,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Subtle bottom-left toggle control */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium transition-all backdrop-blur-md shadow-xs ${
            isActive
              ? 'bg-[#FAF7F2]/90 border-[#C5A059]/40 text-[#5A4D41] hover:text-[#9A7426]'
              : 'bg-white/80 border-stone-200 text-stone-400 hover:text-stone-600'
          }`}
          title="Toggle Rose &amp; Marigold Petal Shower"
        >
          <Flower className={`w-3.5 h-3.5 ${isActive ? 'text-[#9A7426]' : 'text-stone-400'}`} />
          <span className="hidden sm:inline">{isActive ? 'Petals Active' : 'Petals Off'}</span>
        </button>
      </div>
    </>
  );
};
