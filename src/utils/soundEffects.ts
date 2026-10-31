// Offline Web Audio API Synthesizer for Retro 80s Cyberpunk SFX and Procedural Synthwave

class SoundController {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private isMusicPlaying = false;
  private synthLoopId: number | null = null;
  private currentTrackId = 'synth_1';
  public onBeatCallback: ((step: number) => void) | null = null;

  public initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.6;
      this.sfxGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.4;
      this.musicGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setVolumes(masterVol: number, sfxVol: number, musicVol: number) {
    this.initContext();
    if (this.sfxGain) {
      this.sfxGain.gain.value = Math.max(0, Math.min(1, masterVol * sfxVol));
    }
    if (this.musicGain) {
      this.musicGain.gain.value = Math.max(0, Math.min(1, masterVol * musicVol * 0.45));
    }
  }

  // --- SOUND EFFECTS ---

  public playRepClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // Laser transient
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.12);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      // Sub thump
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(140, now);
      sub.frequency.exponentialRampToValueAtTime(45, now + 0.15);
      subGain.gain.setValueAtTime(0.4, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      sub.connect(subGain);
      subGain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.13);
      sub.start(now);
      sub.stop(now + 0.16);
    } catch {}
  }

  public playCoin() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(987.77, now);
      osc1.frequency.setValueAtTime(1318.51, now + 0.08);

      osc2.frequency.setValueAtTime(1975.53, now);
      osc2.frequency.setValueAtTime(2637.02, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.36);
      osc2.stop(now + 0.36);
    } catch {}
  }

  public playLevelUp() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const noteOsc = this.ctx!.createOscillator();
        const noteGain = this.ctx!.createGain();

        noteOsc.type = 'sawtooth';
        noteOsc.frequency.setValueAtTime(freq, now + idx * 0.07);

        noteGain.gain.setValueAtTime(0, now + idx * 0.07);
        noteGain.gain.linearRampToValueAtTime(0.3, now + idx * 0.07 + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

        noteOsc.connect(noteGain);
        noteGain.connect(this.sfxGain!);

        noteOsc.start(now + idx * 0.07);
        noteOsc.stop(now + idx * 0.07 + 0.42);
      });
    } catch {}
  }

  public playTimerBeep(isFinal = false) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isFinal ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isFinal ? 880 : 440, now);
      if (isFinal) {
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.25);
      }

      gain.gain.setValueAtTime(isFinal ? 0.4 : 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (isFinal ? 0.35 : 0.15));

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + (isFinal ? 0.36 : 0.16));
    } catch {}
  }

  public playAchievementChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      [587.33, 739.99, 880.00, 1174.66].forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + i * 0.09);

        g.gain.setValueAtTime(0.2, now + i * 0.09);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.5);

        osc.connect(g);
        g.connect(this.sfxGain!);

        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.52);
      });
    } catch {}
  }

  // --- PROCEDURAL SYNTHWAVE MULTI-TRACK ENGINE ---

  public startProceduralSynthwave(trackId = 'synth_1') {
    // Stop any existing loop first to ensure track switching works immediately!
    this.stopProceduralSynthwave();

    this.initContext();
    if (!this.ctx) return;
    this.isMusicPlaying = true;
    this.currentTrackId = trackId;

    // Track Configurations:
    // 1. synth_1: "Blood Dragon Pulse 1984" - 124 BPM A-minor dark synth
    // 2. synth_2: "Neon Highway Hyperdrive" - 134 BPM D-major upbeat driving synth
    // 3. synth_3: "Cybernetic Tendon Surge" - 110 BPM C-minor heavy industrial synth

    let stepDuration = 0.121; // 124 BPM 16th note
    let bassNotes = [55, 55, 55, 55, 43.65, 43.65, 48.99, 48.99, 43.65, 43.65, 55, 55, 65.41, 65.41, 61.74, 55];
    let leadNotes = [220, 0, 261.63, 0, 293.66, 0, 329.63, 293.66, 261.63, 0, 220, 0, 349.23, 0, 329.63, 261.63];

    if (trackId === 'synth_2') {
      stepDuration = 0.111; // 135 BPM
      bassNotes = [73.42, 73.42, 73.42, 73.42, 82.41, 82.41, 82.41, 82.41, 98.00, 98.00, 98.00, 98.00, 110.00, 110.00, 98.00, 82.41];
      leadNotes = [293.66, 369.99, 440.00, 587.33, 440.00, 369.99, 293.66, 369.99, 440.00, 493.88, 587.33, 659.25, 587.33, 440.00, 369.99, 293.66];
    } else if (trackId === 'synth_3') {
      stepDuration = 0.136; // 110 BPM
      bassNotes = [65.41, 0, 65.41, 65.41, 58.27, 0, 58.27, 58.27, 51.91, 0, 51.91, 51.91, 77.78, 0, 73.42, 65.41];
      leadNotes = [261.63, 0, 311.13, 0, 392.00, 0, 466.16, 392.00, 311.13, 0, 261.63, 0, 392.00, 0, 349.23, 311.13];
    }

    const playNextBar = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      const now = this.ctx.currentTime;

      for (let s = 0; s < 16; s++) {
        const time = now + s * stepDuration;
        const bassFreq = bassNotes[s % bassNotes.length];
        const leadFreq = leadNotes[s % leadNotes.length];

        // Trigger onBeat callback for animated spectrum visualizer
        if (s % 2 === 0 && this.onBeatCallback) {
          setTimeout(() => {
            if (this.onBeatCallback) this.onBeatCallback(s);
          }, s * stepDuration * 1000);
        }

        // 1. Kick on 0, 4, 8, 12
        if (s % 4 === 0) {
          const kickOsc = this.ctx.createOscillator();
          const kickGain = this.ctx.createGain();
          kickOsc.type = 'sine';
          kickOsc.frequency.setValueAtTime(trackId === 'synth_3' ? 110 : 135, time);
          kickOsc.frequency.exponentialRampToValueAtTime(32, time + 0.09);
          kickGain.gain.setValueAtTime(0.42, time);
          kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

          kickOsc.connect(kickGain);
          kickGain.connect(this.musicGain);
          kickOsc.start(time);
          kickOsc.stop(time + 0.1);
        }

        // 2. Snare / Clack on 4 and 12
        if (s === 4 || s === 12) {
          const snareOsc = this.ctx.createOscillator();
          const snareGain = this.ctx.createGain();
          snareOsc.type = trackId === 'synth_3' ? 'sawtooth' : 'triangle';
          snareOsc.frequency.setValueAtTime(trackId === 'synth_2' ? 240 : 190, time);
          snareOsc.frequency.exponentialRampToValueAtTime(75, time + 0.11);
          snareGain.gain.setValueAtTime(0.25, time);
          snareGain.gain.exponentialRampToValueAtTime(0.001, time + 0.11);

          snareOsc.connect(snareGain);
          snareGain.connect(this.musicGain);
          snareOsc.start(time);
          snareOsc.stop(time + 0.12);
        }

        // 3. Hi-Hat on offbeats for Track 2 (Miami)
        if (trackId === 'synth_2' && (s % 2 === 1)) {
          const hatOsc = this.ctx.createOscillator();
          const hatGain = this.ctx.createGain();
          hatOsc.type = 'square';
          hatOsc.frequency.setValueAtTime(4500, time);
          hatGain.gain.setValueAtTime(0.04, time);
          hatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
          hatOsc.connect(hatGain);
          hatGain.connect(this.musicGain);
          hatOsc.start(time);
          hatOsc.stop(time + 0.05);
        }

        // 4. Synth Bass (Sawtooth with lowpass filter sweep)
        if (bassFreq > 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassFilter = this.ctx.createBiquadFilter();
          const bGain = this.ctx.createGain();

          bassOsc.type = trackId === 'synth_3' ? 'square' : 'sawtooth';
          bassOsc.frequency.setValueAtTime(bassFreq, time);

          bassFilter.type = 'lowpass';
          bassFilter.frequency.setValueAtTime(trackId === 'synth_2' ? 600 : 450, time);
          bassFilter.frequency.exponentialRampToValueAtTime(140, time + stepDuration * 0.9);

          bGain.gain.setValueAtTime(0.24, time);
          bGain.gain.exponentialRampToValueAtTime(0.001, time + stepDuration * 0.9);

          bassOsc.connect(bassFilter);
          bassFilter.connect(bGain);
          bGain.connect(this.musicGain);

          bassOsc.start(time);
          bassOsc.stop(time + stepDuration);
        }

        // 5. Arpeggiated Melody Lead
        if (leadFreq > 0) {
          const leadOsc = this.ctx.createOscillator();
          const lGain = this.ctx.createGain();
          leadOsc.type = trackId === 'synth_2' ? 'sawtooth' : 'square';
          leadOsc.frequency.setValueAtTime(leadFreq, time);

          lGain.gain.setValueAtTime(0.07, time);
          lGain.gain.exponentialRampToValueAtTime(0.001, time + stepDuration * 0.85);

          leadOsc.connect(lGain);
          lGain.connect(this.musicGain);
          leadOsc.start(time);
          leadOsc.stop(time + stepDuration);
        }
      }

      this.synthLoopId = window.setTimeout(playNextBar, 16 * stepDuration * 1000 - 15);
    };

    playNextBar();
  }

  public stopProceduralSynthwave() {
    this.isMusicPlaying = false;
    if (this.synthLoopId !== null) {
      clearTimeout(this.synthLoopId);
      this.synthLoopId = null;
    }
  }

  public isSynthPlaying() {
    return this.isMusicPlaying;
  }

  public getCurrentTrackId() {
    return this.currentTrackId;
  }
}

export const soundFx = new SoundController();
