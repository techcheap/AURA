import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Scene from "./three/Scene.jsx";
import EntryScreen from "./components/EntryScreen.jsx";
import Hero from "./components/Hero.jsx";
import FeatureSection from "./components/FeatureSection.jsx";
import { startAudio } from "./audio/AudioEngine.js";

const FEATURES = [
  {
    kicker: "ARCHITECTURE SONORE",
    title: "Champ acoustique 360°",
    body: "Seize transducteurs orientés modélisent une bulle sonore autour de vous. Le son ne vient plus d'une direction — il vous entoure entièrement.",
    pitch: 500,
  },
  {
    kicker: "MATIÈRE & LUMIÈRE",
    title: "Un noyau qui réagit",
    body: "La sphère centrale pulse selon les fréquences captées. Graves profonds, aigus cristallins : chaque nuance devient mouvement et lumière.",
    pitch: 800,
  },
  {
    kicker: "INTELLIGENCE SPATIALE",
    title: "Cartographie de la pièce",
    body: "AURA scanne votre espace en continu et recalibre la projection sonore en temps réel. Où que vous soyez, le point d'écoute parfait vous suit.",
    pitch: 1200,
  },
];

export default function App() {
  const [entered, setEntered] = useState(false);

  const handleEnter = async () => {
    await startAudio();
    setEntered(true);
  };

  return (
    <>
      <Scene />

      <AnimatePresence>
        {!entered && <EntryScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {entered && (
        <main className="content">
          <Hero />
          {FEATURES.map((f, i) => (
            <FeatureSection key={i} index={i} {...f} />
          ))}
          <footer className="footer">
            <h2 className="footer-title">AURA</h2>
            <p>Édition limitée · 001 / 500</p>
            <p className="footer-credit">
              Démo React Three Fiber + Motion + Tone.js
            </p>
          </footer>
        </main>
      )}
    </>
  );
}
