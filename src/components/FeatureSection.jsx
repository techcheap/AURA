import { motion, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import { playWhoosh } from "../audio/AudioEngine.js";

export default function FeatureSection({ index, kicker, title, body, pitch }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (inView && !hasPlayed.current) {
      playWhoosh(pitch);
      hasPlayed.current = true;
    }
    if (!inView) hasPlayed.current = false;
  }, [inView, pitch]);

  const align = index % 2 === 0 ? "left" : "right";

  return (
    <section ref={ref} className={`feature feature--${align}`}>
      <motion.div
        className="feature-card"
        initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 60, filter: "blur(8px)" }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="feature-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="feature-kicker">{kicker}</p>
        <h2 className="feature-title">{title}</h2>
        <p className="feature-body">{body}</p>
      </motion.div>
    </section>
  );
}
