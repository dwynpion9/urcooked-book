// Procedural ambient forest soundscape using Web Audio API.
// Generates layered soft tones + filtered noise for a calming, non-intrusive BGM.
// 100% offline, no external audio files.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let noiseNode: AudioBufferSourceNode | null = null;
let noiseFilter: BiquadFilterNode | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let oscGain1: GainNode | null = null;
let oscGain2: GainNode | null = null;
let lfo: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;
let isPlaying = false;

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.15;
  masterGain.connect(audioCtx.destination);
}

function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }
  return buffer;
}

export function startAmbient() {
  initAudio();
  if (!audioCtx || !masterGain || isPlaying) return;
  if (audioCtx.state === "suspended") audioCtx.resume();

  // Filtered noise (rain/wind layer)
  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = createNoiseBuffer(audioCtx);
  noiseNode.loop = true;
  noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.value = 600;
  noiseFilter.Q.value = 0.5;
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.value = 0.08;
  noiseNode.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noiseNode.start();

  // Soft drone tones (forest ambience)
  osc1 = audioCtx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.value = 110; // A2
  oscGain1 = audioCtx.createGain();
  oscGain1.gain.value = 0.04;
  osc1.connect(oscGain1);
  oscGain1.connect(masterGain);
  osc1.start();

  osc2 = audioCtx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.value = 165; // E3
  oscGain2 = audioCtx.createGain();
  oscGain2.gain.value = 0.03;
  osc2.connect(oscGain2);
  oscGain2.connect(masterGain);
  osc2.start();

  // LFO for gentle volume modulation
  lfo = audioCtx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.1;
  lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 0.02;
  lfo.connect(lfoGain);
  lfoGain.connect(oscGain1.gain);
  lfo.start();

  isPlaying = true;
}

export function stopAmbient() {
  if (noiseNode) { try { noiseNode.stop(); } catch { /* */ } noiseNode = null; }
  if (osc1) { try { osc1.stop(); } catch { /* */ } osc1 = null; }
  if (osc2) { try { osc2.stop(); } catch { /* */ } osc2 = null; }
  if (lfo) { try { lfo.stop(); } catch { /* */ } lfo = null; }
  isPlaying = false;
}

export function isAmbientPlaying(): boolean {
  return isPlaying;
}

export function setVolume(vol: number) {
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(vol, audioCtx.currentTime, 0.1);
  }
}
