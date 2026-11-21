import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

// Place your own MP3 in public/music/our-song.mp3.
const SONG_URL = '/music/our-song.mp3';

export interface MusicPlayerHandle {
  /** Call directly inside a click/tap handler so browsers allow audio playback. */
  play: () => void;
}

interface MusicPlayerProps {
  showControls?: boolean;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(function MusicPlayer(
  { showControls = true }, ref
) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);

  const playSong = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Calling .play() immediately preserves the diya button's user gesture.
    const playAttempt = audio.play();
    if (playAttempt) {
      void playAttempt.then(() => setError(false)).catch(() => {
        setError(true);
        setIsPlaying(false);
      });
    }
  };

  useImperativeHandle(ref, () => ({ play: playSong }));

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) audio.pause();
    else playSong();
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={SONG_URL}
        loop
        preload="none"
        onPlay={() => { setIsPlaying(true); setError(false); }}
        onPause={() => setIsPlaying(false)}
        onError={() => { setError(true); setIsPlaying(false); }}
      />
      {showControls && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
          {error && (
            <p role="status" className="max-w-64 rounded-lg bg-[#2C241E] px-3 py-2 text-xs leading-relaxed text-white shadow-lg">
              
            </p>
          )}
          <div className="flex items-center gap-2 rounded-full border border-[#C5A059]/50 bg-[#FAF7F2]/95 px-3 py-2 shadow-lg backdrop-blur-md">
            <button
              type="button"
              onClick={togglePlayback}
              className="flex items-center gap-2 rounded-full px-1 py-1 text-[#2C241E] focus-visible:outline-2 focus-visible:outline-[#9A7426]"
              aria-label={isPlaying ? 'Pause our song' : 'Play our song'}
              title={isPlaying ? 'Pause our song' : 'Play our song'}
            >
              {isPlaying ? <Pause className="h-4 w-4 text-[#9A7426]" /> : <Play className="h-4 w-4 text-[#9A7426]" />}
              <span className="hidden text-[11px] font-semibold uppercase tracking-wider sm:inline">{isPlaying ? 'Our Song Playing' : 'Play Our Song'}</span>
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="rounded-full p-1 text-[#9A7426] focus-visible:outline-2 focus-visible:outline-[#9A7426]"
              aria-label={isMuted ? 'Unmute our song' : 'Mute our song'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
});
