import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// Objet central : noyau distordu + anneaux orbitaux.
// scrollProgress (0->1) rapproche la caméra de l'objet et accélère la rotation.
export default function HeroObject({ pointer, scrollProgress }) {
  const group = useRef();
  const core = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const sp = scrollProgress.current;

    // Rotation de base + influence du scroll
    if (group.current) {
      // parallaxe douce vers le pointeur
      const targetX = pointer.current.y * 0.3;
      const targetY = pointer.current.x * 0.5 + t * (0.15 + sp * 0.4);
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    }

    if (core.current) {
      core.current.rotation.z = t * 0.2;
    }
    // Anneaux qui tournent à des vitesses différentes
    if (ring1.current) ring1.current.rotation.z = t * 0.5;
    if (ring2.current) ring2.current.rotation.x = t * 0.3;
    if (ring3.current) ring3.current.rotation.y = t * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={group}>
        {/* Noyau lumineux distordu */}
        <mesh ref={core}>
          <icosahedronGeometry args={[1.1, 8]} />
          <MeshDistortMaterial
            color="#5b8cff"
            emissive="#1a3aff"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.9}
            distort={0.35}
            speed={2}
          />
        </mesh>

        {/* Halo intérieur translucide */}
        <mesh scale={1.25}>
          <icosahedronGeometry args={[1.1, 4]} />
          <meshBasicMaterial
            color="#8fb3ff"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Anneaux orbitaux */}
        <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.012, 16, 128]} />
          <meshStandardMaterial
            color="#aec6ff"
            emissive="#4a7bff"
            emissiveIntensity={1.2}
            metalness={1}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={ring2} rotation={[0, Math.PI / 3, Math.PI / 4]}>
          <torusGeometry args={[2.6, 0.008, 16, 128]} />
          <meshStandardMaterial
            color="#c9b3ff"
            emissive="#7a4aff"
            emissiveIntensity={1}
            metalness={1}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={ring3} rotation={[Math.PI / 5, 0, Math.PI / 6]}>
          <torusGeometry args={[3.2, 0.006, 16, 128]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#5b8cff"
            emissiveIntensity={0.8}
            metalness={1}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}
