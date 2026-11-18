/**
 * Royal Wedding Ambient Synthesizer using Web Audio API
 * Plays a soothing, meditative Indian wedding ambient melody (Flute / Shehnai pentatonic notes with soft Tanpura drone)
 * Works 100% offline with zero external network audio assets.
 */
class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private droneOscillators: OscillatorNode[] = [];

  // Raag Yaman / Bhupali inspired warm pentatonic frequencies (Sa, Re, Ga, Pa, Dha)
  private melodyFreqs: number[] = [
    293.66, // D4
    329.63, // E4
    369.99, // F#4
    440.00, // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    739.99, // F#5
    880.00, // A5
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (!this.ctx || !this.masterGain) return;

    // Start warm tanpura-like drone (Root D3 + Fifth A3)
    const rootFreq = 146.83; // D3
    const fifthFreq = 220.00; // A3

    const drone1 = this.ctx.createOscillator();
    const drone2 = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();

    drone1.type = 'triangle';
    drone1.frequency.setValueAtTime(rootFreq, this.ctx.currentTime);

    drone2.type = 'sine';
    drone2.frequency.setValueAtTime(fifthFreq, this.ctx.currentTime);

    droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(this.masterGain);

    drone1.start();
    drone2.start();
    this.droneOscillators = [drone1, drone2];

    // Schedule gentle melodic notes every 1.8 - 2.8s
    let noteIndex = 0;
    const playNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sinusoidal / flute timbre with slight vibrato
      osc.type = 'sine';
      
      // Select melody note with smooth progression
      const freq = this.melodyFreqs[noteIndex % this.melodyFreqs.length];
      noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % this.melodyFreqs.length;

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(freq, now);

      // Flute envelope: gentle swell and lingering tail
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.07, now + 0.35);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.3);

      const nextDelay = 1800 + Math.random() * 1200;
      this.timerId = window.setTimeout(playNote, nextDelay);
    };

    playNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.droneOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.droneOscillators = [];
  }

  public toggleMute(): boolean {
    if (!this.masterGain || !this.ctx) return false;
    this.isMuted = !this.isMuted;
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const weddingAudio = new WeddingAudioEngine();
