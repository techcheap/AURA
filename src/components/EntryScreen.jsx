import { motion } from "motion/react";

export default function EntryScreen({ onEnter }) {
  return (
    <motion.div
      className="entry"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="entry-inner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="entry-kicker">SPATIAL AUDIO INSTRUMENT</p>
        <h1 className="entry-title">AURA</h1>
        <button className="entry-btn" onClick={onEnter}>
          <span>Entrer dans l'expérience</span>
          <em>son activé</em>
        </button>
        <p className="entry-note">
          Utilisez un casque pour l'expérience spatiale complète
        </p>
      </motion.div>
    </motion.div>
  );
}
