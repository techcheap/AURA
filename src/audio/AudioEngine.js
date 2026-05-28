import * as Tone from "tone";

// ============================================================
//  AudioEngine — synthèse temps réel, aucun fichier externe.
//  Tout le SFX "spatial / ambient" est généré à la volée.
// ============================================================

let started = false;

// -- Bus master avec reverb large pour la profondeur spatiale --
let masterReverb;
let masterGain;

// -- Drone ambient de fond --
let droneA;
let droneB;
let droneFilter;
let droneLFO;

// -- Synth pour les "whoosh" d'entrée de section --
let whooshNoise;
let whooshFilter;
let whooshEnv;

// -- Synth pour les blips d'interaction (hover/click) --
let blipSynth;

export async function startAudio() {
  if (started) return;
  await Tone.start();
  started = true;

  // --- Master chain ---
  masterGain = new Tone.Gain(0.0).toDestination();
  masterReverb = new Tone.Reverb({ decay: 8, wet: 0.55, preDelay: 0.05 });
  masterReverb.connect(masterGain);

  // --- Drone ambient : deux oscillateurs désaccordés + filtre mouvant ---
  droneFilter = new Tone.Filter({ type: "lowpass", frequency: 600, Q: 1.5 });
  droneFilter.connect(masterReverb);

  droneA = new Tone.Oscillator({ frequency: 55, type: "sine", volume: -18 });
  droneB = new Tone.Oscillator({ frequency: 55.4, type: "triangle", volume: -22 });
  droneA.connect(droneFilter);
  droneB.connect(droneFilter);

  // LFO qui ouvre/ferme le filtre lentement -> respiration spatiale
  droneLFO = new Tone.LFO({ frequency: 0.05, min: 350, max: 1100 });
  droneLFO.connect(droneFilter.frequency);

  droneA.start();
  droneB.start();
  droneLFO.start();

  // --- Whoosh : bruit filtré avec enveloppe ---
  whooshFilter = new Tone.Filter({ type: "bandpass", frequency: 800, Q: 2 });
  whooshFilter.connect(masterReverb);
  whooshEnv = new Tone.AmplitudeEnvelope({
    attack: 0.4,
    decay: 0.2,
    sustain: 0,
    release: 1.2,
  });
  whooshEnv.connect(whooshFilter);
  whooshNoise = new Tone.Noise("pink");
  whooshNoise.connect(whooshEnv);
  whooshNoise.start();

  // --- Blip : petit synth cristallin pour les interactions ---
  blipSynth = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0, release: 0.4 },
    volume: -20,
  });
  blipSynth.connect(masterReverb);

  // Fade-in du master sur 4s
  masterGain.gain.rampTo(0.9, 4);
}

// Whoosh de transition (entrée de section au scroll)
export function playWhoosh(pitch = 800) {
  if (!started) return;
  whooshFilter.frequency.rampTo(pitch, 0.5);
  whooshEnv.triggerAttackRelease(1.4);
}

// Blip d'interaction (hover sur les features, etc.)
export function playBlip(note = "C5") {
  if (!started) return;
  blipSynth.triggerAttackRelease(note, "16n");
}

// Accord doux au survol du produit
export function playChord() {
  if (!started) return;
  const notes = ["C4", "E4", "G4", "B4"];
  notes.forEach((n, i) => {
    setTimeout(() => blipSynth.triggerAttackRelease(n, "8n"), i * 60);
  });
}

export function setMasterVolume(v) {
  if (masterGain) masterGain.gain.rampTo(v, 0.5);
}
