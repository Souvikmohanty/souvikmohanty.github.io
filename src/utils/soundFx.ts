// Web Audio API 8-bit chiptune synthesizer for optional field-walk feedback.
// Muted by default; only produces sound when explicitly enabled by the user.

class PixelSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = false;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
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
      void this.ctx.resume();
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
    if (!ctx) return;

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
