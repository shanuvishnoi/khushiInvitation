import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

export const ScratchTheDate: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const strokesRef = useRef(0);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#C49A48');
    gradient.addColorStop(0.45, '#EAD39D');
    gradient.addColorStop(1, '#A67B2F');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = '#624B25';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `600 ${Math.min(25, rect.width / 15)}px Georgia, serif`;
    ctx.fillText('Scratch to reveal', rect.width / 2, rect.height / 2 - 12);
    ctx.font = `14px Georgia, serif`;
    ctx.fillText('our special date ✦', rect.width / 2, rect.height / 2 + 20);
    strokesRef.current = 0;
  }, [revealed]);

  useEffect(() => {
    paintCover();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => paintCover());
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [paintCover, resetKey]);

  const scratchAt = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(canvas.width / rect.width, 0, 0, canvas.height / rect.height, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 42;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current?.x ?? point.x, lastPointRef.current?.y ?? point.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.restore();
    lastPointRef.current = point;
    strokesRef.current += 1;
    // Approximate revealed area periodically, not on every pointer event.
    if (strokesRef.current % 12 === 0) {
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      let sampled = 0;
      for (let i = 3; i < data.length; i += 160) {
        sampled += 1;
        if (data[i] < 50) transparent += 1;
      }
      if (sampled > 0 && transparent / sampled > 0.42) setRevealed(true);
    }
  };

  const reset = () => {
    setRevealed(false);
    lastPointRef.current = null;
    setResetKey((key) => key + 1);
  };

  return (
    <section id="scratch-date" className="relative scroll-mt-20 overflow-hidden bg-[#FAF7F2] px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 font-editorial text-sm uppercase tracking-[0.25em] text-[#9A7426]">A Little Surprise</p>
        <h2 className="font-display text-4xl text-[#2C241E] sm:text-5xl">Scratch the Date</h2>
        <p className="mx-auto mt-4 max-w-lg text-[#6B5A4B]">A beautiful beginning deserves a little magic. Scratch the golden card to uncover our special day.</p>
        <div className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-[2rem] border-4 border-[#E5D0A7] bg-[#FFF9EC] shadow-[0_20px_55px_-20px_rgba(89,62,23,0.35)]">
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-10 sm:min-h-80">
            <Sparkles className="mb-4 h-7 w-7 text-[#A67B2F]" aria-hidden="true" />
            <p className="font-editorial text-sm uppercase tracking-[0.22em] text-[#9A7426]">Save the Date</p>
            <p className="mt-4 font-display text-4xl font-semibold text-[#39291B] sm:text-5xl">{WEDDING_DETAILS.dates.display}</p>
            <p className="mt-3 font-script text-4xl text-[#9A7426]">Pratha &amp; Abhinav</p>
            <p className="mt-3 text-sm text-[#6B5A4B]">With love, blessings &amp; a forever to celebrate</p>
            
         </div>
          
          {!revealed && (
            <canvas
              key={resetKey}
              ref={canvasRef}
              className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
              onPointerDown={(event) => {
                drawingRef.current = true;
                lastPointRef.current = null;
                event.currentTarget.setPointerCapture(event.pointerId);
                scratchAt(event);
              }}
              onPointerMove={(event) => { if (drawingRef.current) scratchAt(event); }}
              onPointerUp={() => { drawingRef.current = false; lastPointRef.current = null; }}
              onPointerCancel={() => { drawingRef.current = false; lastPointRef.current = null; }}
              aria-label="Scratch the golden covering with your finger or mouse to reveal the wedding date"
            />
          )}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {!revealed && <button type="button" onClick={() => setRevealed(true)} className="rounded-full border border-[#C5A059] px-5 py-2 text-sm font-semibold text-[#715523] hover:bg-[#F5EFE6]">Reveal Date</button>}
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[#6B5A4B] hover:text-[#9A7426]">
            <RotateCcw className="h-4 w-4" /> Scratch Again
          </button>
        </div>
      </div>
    </section>
  );
};
