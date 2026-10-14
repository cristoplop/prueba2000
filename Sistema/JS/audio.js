/**
 * Motor de Sonido Web Audio API para Mundo Tablas
 * 100% libre de dependencias externas, offline y optimizado para niños.
 */
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.init();
    }

    init() {
        // Inicialización diferida por políticas de autoplay de navegadores
        const unlock = () => {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            window.removeEventListener('click', unlock);
            window.removeEventListener('keydown', unlock);
            window.removeEventListener('touchstart', unlock);
        };
        window.addEventListener('click', unlock, { once: false });
        window.addEventListener('keydown', unlock, { once: false });
        window.addEventListener('touchstart', unlock, { once: false });
    }

    getAudioContext() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted && this.bgmPlaying) {
            this.stopBgm();
        }
        return this.isMuted;
    }

    // Tono simple con envolvente ADSR
    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.18, startTimeOffset = 0) {
        if (this.isMuted) return;
        const ctx = this.getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const t = ctx.currentTime + startTimeOffset;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(gainVal, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + duration + 0.05);
    }

    // Clic burbuja al presionar botones
    playClick() {
        if (this.isMuted) return;
        const ctx = this.getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(260, t + 0.08);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
    }

    // Selección de avatar / tarjeta
    playSelect() {
        if (this.isMuted) return;
        this.playTone(440, 'triangle', 0.1, 0.18);
        this.playTone(660, 'triangle', 0.15, 0.22, 0.08);
    }

    // Respuesta correcta / acierto entusiasta
    playSuccess() {
        if (this.isMuted) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            this.playTone(freq, 'sine', 0.2, 0.2, idx * 0.07);
        });
    }

    // Error suave (retroalimentación formativa y amable)
    playError() {
        if (this.isMuted) return;
        const ctx = this.getAudioContext();
        if (!ctx) return;

        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.25);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.26);
    }

    // Moneda / Puntos / Estrella ganada
    playCoin() {
        if (this.isMuted) return;
        const ctx = this.getAudioContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, t); // B5
        osc.frequency.setValueAtTime(1318.51, t + 0.08); // E6

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.36);
    }

    // Volteo de carta en memorice
    playCardFlip() {
        if (this.isMuted) return;
        this.playTone(320, 'sine', 0.08, 0.15);
    }

    // Salto del personaje en la recta numérica
    playJump() {
        if (this.isMuted) return;
        const ctx = this.getAudioContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.exponentialRampToValueAtTime(650, t + 0.18);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.19);
    }

    // Desbloqueo épico del Modo SIMCE
    playUnlock() {
        if (this.isMuted) return;
        const freqs = [440, 554, 659, 880, 1108, 1318, 1760];
        freqs.forEach((f, i) => {
            this.playTone(f, 'triangle', 0.35, 0.18, i * 0.06);
        });
    }

    // Fanfarria triunfal al completar tabla o prueba SIMCE
    playFanfare() {
        if (this.isMuted) return;
        const notes = [
            { f: 523.25, d: 0.15, t: 0 },       // C5
            { f: 523.25, d: 0.15, t: 0.15 },    // C5
            { f: 523.25, d: 0.15, t: 0.30 },    // C5
            { f: 659.25, d: 0.35, t: 0.45 },    // E5
            { f: 587.33, d: 0.15, t: 0.80 },    // D5
            { f: 659.25, d: 0.15, t: 0.95 },    // E5
            { f: 783.99, d: 0.65, t: 1.10 }     // G5
        ];

        notes.forEach(n => {
            this.playTone(n.f, 'triangle', n.d, 0.25, n.t);
            this.playTone(n.f * 1.002, 'sine', n.d, 0.15, n.t); // armónico brillante
        });
    }

    // Música de fondo tranquila estilo marimba 8-bit (opcional)
    startBgm() {
        if (this.bgmPlaying || this.isMuted) return;
        this.bgmPlaying = true;
        
        const scale = [261.63, 329.63, 392.00, 523.25, 440.00, 392.00]; // Pentatónica C mayor
        let step = 0;
        
        const loop = () => {
            if (!this.bgmPlaying) return;
            const freq = scale[step % scale.length];
            this.playTone(freq, 'sine', 0.12, 0.04);
            step++;
            this.bgmTimer = setTimeout(loop, 400);
        };
        loop();
    }

    stopBgm() {
        this.bgmPlaying = false;
        if (this.bgmTimer) {
            clearTimeout(this.bgmTimer);
            this.bgmTimer = null;
        }
    }

    toggleBgmMusic() {
        if (this.bgmPlaying) {
            this.stopBgm();
            return false;
        } else {
            this.startBgm();
            return true;
        }
    }
}

// Instancia global accesible desde cualquier script
window.sound = new SoundEngine();
