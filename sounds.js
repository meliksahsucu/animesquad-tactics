// NEXUS // Gelişmiş Taktil ve Mekanik Ses Motoru
// Gerçekçi "TIRRRRRRRR" Çark Dişli Efekti (Ratchet Wheel / Mechanical Clicker)

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.spinTimer = null;
    this.isSpinningAudio = false;
    this.clickBuffer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.createClickNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Gerçek mekanik dişli tırnağı (ratchet) için mikro gürültü darbesi oluştur
  createClickNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.015); // 15 ms çok kısa tok tırnak darbesi
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Üstel sönümlü darbe + rezonanslı beyaz gürültü
      const decay = Math.exp(-i / (bufferSize * 0.22));
      data[i] = (Math.random() * 2 - 1) * decay;
    }
    this.clickBuffer = buffer;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopSpinSound();
    }
    return this.muted;
  }

  // Tekil mekanik tıkırtı darbesi (ratchet click)
  playRatchetClick(pitchScale = 1.0, volume = 0.22) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Gürültü Darbesi (Tırnak sürtünmesi)
    if (this.clickBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.clickBuffer;
      noise.playbackRate.setValueAtTime(pitchScale, t);

      // Bandpass filtre: Dişli plastiği/metali rezonansı (1.8kHz - 3.2kHz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2200 * pitchScale, t);
      filter.Q.setValueAtTime(3.5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
    }

    // 2. Tok Gövde Vuruşu (Gövde rezonansı)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(280 * pitchScale, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.025);

    oscGain.gain.setValueAtTime(volume * 0.7, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  // ========================================================================
  // GERÇEKÇİ "TIRRRRRRR" ÇEVİRME MOTORU
  // Hızla başlar, gittikçe seyrekleşen organik dişli tırnağı sesi üretir
  // ========================================================================
  startSpinSound(initialInterval = 28) {
    if (this.muted) return;
    this.init();
    this.stopSpinSound();

    this.isSpinningAudio = true;
    let currentInterval = initialInterval; // 28ms = saniyede ~35 tıkırtı (yoğun TIRRRRR!)

    const scheduleNextClick = () => {
      if (!this.isSpinningAudio) return;

      // Hafif organik perde dalgalanması (her tırnak vuruşunda doğallık)
      const pitch = 0.92 + Math.random() * 0.22;
      this.playRatchetClick(pitch, 0.26);

      // Çarklar dönerken interval hafifçe artar veya stabil kalır
      this.spinTimer = setTimeout(scheduleNextClick, currentInterval);
    };

    scheduleNextClick();
  }

  // 1. ve 2. çark durdukça hızın hafifçe yavaşlaması (TIRRRR -> TR-TR-TR)
  slowDownSpinSound(newInterval = 48) {
    if (!this.isSpinningAudio) return;
    // Bir sonraki tıkırtı periyodunu uzat
    if (this.spinTimer) {
      clearTimeout(this.spinTimer);
    }
    let currentInterval = newInterval;

    const scheduleSlowClick = () => {
      if (!this.isSpinningAudio) return;
      const pitch = 0.85 + Math.random() * 0.18;
      this.playRatchetClick(pitch, 0.22);
      this.spinTimer = setTimeout(scheduleSlowClick, currentInterval);
    };

    scheduleSlowClick();
  }

  stopSpinSound() {
    this.isSpinningAudio = false;
    if (this.spinTimer) {
      clearTimeout(this.spinTimer);
      this.spinTimer = null;
    }
  }

  // Kol çekme mekanik yay sesi
  playLeverPull() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Ağır mandal çekilme sesi
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(210, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.16);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.2);

    // Yay çınlaması
    setTimeout(() => {
      if (this.muted || !this.ctx) return;
      const t2 = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(360, t2);
      osc2.frequency.exponentialRampToValueAtTime(110, t2 + 0.22);

      gain2.gain.setValueAtTime(0.18, t2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.22);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc2.start(t2);
      osc2.stop(t2 + 0.23);
    }, 90);
  }

  // Çarkın yerine oturma / Tok Kilitlenme Vuruşu ("THWACK / CLACK!")
  playReelStop(reelIndex) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const baseFreqs = [160, 220, 290];
    const freq = baseFreqs[reelIndex] || 200;

    // Metal mandal çarpması
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq * 1.8, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.14);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.22);

    // Rezonanslı metalik çınlama (özellikle 3. çarkta)
    if (reelIndex === 2) {
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = "sine";
      bell.frequency.setValueAtTime(587.33, t); // D5
      bellGain.gain.setValueAtTime(0.25, t);
      bellGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      bell.connect(bellGain);
      bellGain.connect(this.ctx.destination);

      bell.start(t);
      bell.stop(t + 0.42);
    }
  }

  // Jackpot Zafer Onayı (Zarif, tatlı çift ton)
  playJackpotWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.1 },  // C5
      { f: 659.25, d: 0.1 },  // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.35 } // C6
    ];

    let start = this.ctx.currentTime + 0.04;
    notes.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.f, start);

      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + note.d);

      start += note.d * 0.85;
    });
  }

  // Fotoğraf Deklanşör Sesi
  playCameraShutter() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.setValueAtTime(280, t + 0.04);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.14);
  }

  // Hover Tıkırtısı
  playTick() {
    this.playRatchetClick(1.2, 0.08);
  }
}

window.soundFX = new SoundFX();
