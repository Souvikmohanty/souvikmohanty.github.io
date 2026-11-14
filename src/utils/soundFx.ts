// Web Audio API 8-bit chiptune synthesizer for field-walk feedback.
// Enabled by default; users can mute/unmute anytime from the Field Walk HUD.

class PixelSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private unlockBound = false;
  private listeners = new Set<(enabled: boolean) => void>();

  constructor() {
    this.bindGestureUnlock();
  }

  private bindGestureUnlock(): void {
    if (typeof window === 'undefined' || this.unlockBound) return;
    this.unlockBound = true;

    const unlock = () => {
      if (!this.enabled) return;
      const ctx = this.ensureContext();
      if (ctx && ctx.state === 'suspended') {
        void ctx.resume().catch(() => {});
      }
      if (ctx && ctx.state === 'running') {
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('touchstart', unlock);
        window.removeEventListener('keydown', unlock);
      }
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
    this.listeners.forEach((fn) => fn(next));
    if (next) {
      this.ensureContext();
      this.playToggleOn();
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    durationSec: number,
    type: OscillatorType = 'square',
    volume = 0.04,
    delaySec = 0,
  ): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx || ctx.state !== 'running') return;

    const now = ctx.currentTime + delaySec;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  }

  public playToggleOn(): void {
    this.playTone(523.25, 0.07, 'square', 0.035, 0);
    this.playTone(659.25, 0.09, 'square', 0.035, 0.06);
  }

  public playStep(): void {
    this.playTone(180, 0.035, 'triangle', 0.025, 0);
  }

  public playClimbStep(): void {
    // Gentle wooden/bamboo rung knock while descending or climbing
    this.playTone(215, 0.032, 'triangle', 0.024, 0);
    this.playTone(155, 0.03, 'triangle', 0.018, 0.025);
  }

  public playBurrowEnter(): void {
    // Descending subterranean shaft chime
    this.playTone(440, 0.06, 'triangle', 0.03, 0);
    this.playTone(349.23, 0.06, 'triangle', 0.03, 0.06);
    this.playTone(261.63, 0.1, 'triangle', 0.032, 0.12);
  }

  public playStationFocus(stationIndex: number): void {
    const baseFreqs = [440, 493.88, 587.33];
    const base = baseFreqs[stationIndex % baseFreqs.length] ?? 440;
    this.playTone(base, 0.06, 'triangle', 0.028, 0);
    this.playTone(base * 1.25, 0.09, 'triangle', 0.028, 0.055);
  }

  public playSpecimenTap(pitchIndex = 0): void {
    const notes = [523.25, 587.33, 659.25, 783.99, 880];
    const freq = notes[pitchIndex % notes.length] ?? 523.25;
    this.playTone(freq, 0.07, 'sine', 0.035, 0);
  }

  public playJump(): void {
    this.playTone(329.63, 0.05, 'square', 0.032, 0);
    this.playTone(523.25, 0.08, 'square', 0.032, 0.04);
  }

  public playMilestoneArrive(isFinal = false): void {
    if (isFinal) {
      // Celebratory 4-note arcade fanfare for PhD "Now" stop
      this.playTone(523.25, 0.08, 'square', 0.035, 0);
      this.playTone(659.25, 0.08, 'square', 0.035, 0.08);
      this.playTone(783.99, 0.08, 'square', 0.035, 0.16);
      this.playTone(1046.5, 0.16, 'square', 0.04, 0.24);
      return;
    }
    this.playTone(440, 0.07, 'square', 0.03, 0);
    this.playTone(587.33, 0.1, 'square', 0.03, 0.07);
  }

  public playInspectOpen(): void {
    this.playTone(587.33, 0.06, 'triangle', 0.04, 0);
    this.playTone(880, 0.11, 'triangle', 0.04, 0.05);
  }

  public playInspectClose(): void {
    this.playTone(440, 0.06, 'triangle', 0.03, 0);
  }
}

export const soundFx = new PixelSoundEngine();
