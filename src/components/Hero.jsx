import { motion } from "motion/react";
import { playChord } from "../audio/AudioEngine.js";

export default function Hero() {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
        onMouseEnter={playChord}
      >
        <motion.p className="hero-kicker" variants={item}>
          INSTRUMENT AUDIO SPATIAL · ÉDITION 001
        </motion.p>
        <motion.h1 className="hero-title" variants={item}>
          Le son<br />
          <span className="hero-title-accent">prend forme</span>
        </motion.h1>
        <motion.p className="hero-sub" variants={item}>
          AURA traduit l'espace acoustique en une présence physique.
          Une sphère d'énergie qui respire au rythme de ce que vous entendez.
        </motion.p>
        <motion.div className="hero-cta" variants={item}>
          <button className="btn-primary">Précommander</button>
          <button className="btn-ghost">Voir la démo</button>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>défiler</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
