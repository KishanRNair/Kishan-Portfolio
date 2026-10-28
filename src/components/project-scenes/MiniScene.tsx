import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Small interactive 3D scenes for project previews.
 * Rendered client-side only (lazy-imported behind a WebGL check).
 */

export type MiniVariant = "orbit-product" | "abstract-env";

interface MiniSceneProps {
  variant: MiniVariant;
  pointer: { current: { x: number; y: number } };
}

const OBSIDIAN = "#1b1813";
const CHAMPAGNE = "#b59a6a";
const IVORY = "#f3ebdd";

function OrbitProduct({ pointer }: { pointer: MiniSceneProps["pointer"] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, raw) => {
    const delta = Math.min(raw, 0.05);
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    const targetY = t * 0.35 + pointer.current.x * 0.5;
    const targetX = -pointer.current.y * 0.28;
    g.rotation.y += (targetY - g.rotation.y) * (1 - Math.exp(-3 * delta));
    g.rotation.x += (targetX - g.rotation.x) * (1 - Math.exp(-3 * delta));
  });

  return (
    <group ref={group} rotation={[0.1, -0.4, 0]}>
      {/* Device body */}
      <RoundedBox args={[2.7, 1.75, 0.14]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color={OBSIDIAN} metalness={0.6} roughness={0.3} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.078]}>
        <planeGeometry args={[2.5, 1.55]} />
        <meshStandardMaterial
          color="#141210"
          metalness={0.2}
          roughness={0.4}
          emissive="#241f18"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* UI placeholder bars on screen */}
      <mesh position={[0, 0.42, 0.082]}>
        <planeGeometry args={[1.6, 0.34]} />
        <meshStandardMaterial color={CHAMPAGNE} roughness={0.5} emissive={CHAMPAGNE} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[-0.55, 0.02, 0.082]}>
        <planeGeometry args={[1.0, 0.09]} />
        <meshStandardMaterial color="#8f867a" roughness={0.6} />
      </mesh>
      <mesh position={[-0.35, -0.14, 0.082]}>
        <planeGeometry args={[0.6, 0.09]} />
        <meshStandardMaterial color="#5f574c" roughness={0.6} />
      </mesh>
      {/* Champagne ring behind */}
      <mesh position={[0, 0, -0.6]} rotation={[0.9, 0.2, 0]}>
        <torusGeometry args={[1.6, 0.02, 10, 96]} />
        <meshStandardMaterial color={CHAMPAGNE} metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

const CRYSTALS = [
  { pos: [-0.9, 0.3, 0], size: 0.55, detail: 0, champagne: false },
  { pos: [0.9, -0.25, 0.4], size: 0.42, detail: 0, champagne: true },
  { pos: [0.1, 0.85, -0.5], size: 0.34, detail: 1, champagne: false },
  { pos: [0.45, -0.75, 0.2], size: 0.26, detail: 1, champagne: true },
];

function AbstractEnv({ pointer }: { pointer: MiniSceneProps["pointer"] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, raw) => {
    const delta = Math.min(raw, 0.05);
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    g.rotation.y += ((pointer.current.x * 0.35 - g.rotation.y) * (1 - Math.exp(-2 * delta)));
    g.position.y = Math.sin(t * 0.6) * 0.12;
    g.children.forEach((child, i) => {
      child.rotation.x = t * (0.1 + i * 0.04);
      child.rotation.z = t * (0.08 + i * 0.03);
    });
  });

  return (
    <group ref={group}>
      {CRYSTALS.map((c, i) => (
        <mesh key={i} position={c.pos as [number, number, number]}>
          <icosahedronGeometry args={[c.size, c.detail]} />
          <meshStandardMaterial
            color={c.champagne ? CHAMPAGNE : OBSIDIAN}
            metalness={c.champagne ? 0.85 : 0.6}
            roughness={c.champagne ? 0.25 : 0.2}
            flatShading
            envMapIntensity={1.3}
          />
        </mesh>
      ))}
      <mesh rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[1.35, 0.014, 8, 96]} />
        <meshStandardMaterial color={CHAMPAGNE} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh rotation={[-0.8, -0.3, 0.6]}>
        <torusGeometry args={[1.05, 0.01, 8, 96]} />
        <meshStandardMaterial color="#6b5a44" metalness={0.8} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function MiniScene({ variant, pointer }: MiniSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.4} color={IVORY} />
      <directionalLight position={[3, 4, 4]} intensity={1.2} color={IVORY} />
      <pointLight position={[-3, -1, 2]} intensity={5} color={CHAMPAGNE} distance={9} />
      <Environment resolution={96}>
        <Lightformer
          intensity={1.4}
          position={[0, 4, 0]}
          scale={[8, 8, 1]}
          rotation-x={Math.PI / 2}
          color={IVORY}
        />
        <Lightformer
          intensity={0.9}
          color={CHAMPAGNE}
          position={[-4, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[10, 1, 1]}
        />
      </Environment>
      {variant === "orbit-product" ? (
        <OrbitProduct pointer={pointer} />
      ) : (
        <AbstractEnv pointer={pointer} />
      )}
    </Canvas>
  );
}
