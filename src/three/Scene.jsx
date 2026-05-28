import { Canvas } from "@react-three/fiber";
import { Stars, Environment } from "@react-three/drei";
import { useRef, useEffect } from "react";
import HeroObject from "./HeroObject.jsx";

export default function Scene() {
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#05060d"]} />
        <fog attach="fog" args={["#05060d", 8, 18]} />

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#6f8fff" />
        <pointLight position={[-5, -3, 2]} intensity={1.2} color="#b06fff" />

        <Stars
          radius={60}
          depth={40}
          count={4000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        <HeroObject pointer={pointer} scrollProgress={scrollProgress} />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
