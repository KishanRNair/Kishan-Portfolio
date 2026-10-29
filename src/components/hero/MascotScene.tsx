import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Hero scene: a procedural obsidian "monolith" mascot with a champagne orbit
 * ring and drifting smoke haze. Fully procedural — swap the Monolith component
 * for a GLTF model later without touching the rest of the scene.
 *
 * Rendered client-side only (lazy-imported from HeroStage inside useEffect).
 */

export interface SceneRefs {
  pointer: { current: { x: number; y: number } };
  scroll: { current: number };
}

const OBSIDIAN = "#17150f";
const MOCHA = "#2a2620";
const CHAMPAGNE = "#b59a6a";
const IVORY = "#f3ebdd";

/* ---------------- Smoke haze (shader plane) ---------------- */

const SMOKE_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SMOKE_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.55;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 drift = vec2(uTime * 0.014, uTime * 0.007);
    float n = fbm(uv * 3.0 + drift + uPointer * 0.22);
    float n2 = fbm(uv * 6.0 - drift * 1.35 + n * 0.9);
    float haze = smoothstep(0.32, 0.9, n * 0.6 + n2 * 0.55);
    vec3 col = mix(vec3(0.13, 0.115, 0.095), vec3(0.24, 0.195, 0.135), n2);
    float d = distance(uv, vec2(0.5));
    float vig = smoothstep(0.72, 0.28, d);
    gl_FragColor = vec4(col, haze * 0.16 * vig);
  }
`;

function Smoke({ refs, reduced }: { refs: SceneRefs; reduced: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    const mat = matRef.current;
    if (!mat || reduced) return;
    const timeU = mat.uniforms["uTime"];
    const pointerU = mat.uniforms["uPointer"];
    if (timeU) timeU.value = state.clock.elapsedTime;
    if (pointerU)
      (pointerU.value as THREE.Vector2).set(
        refs.pointer.current.x,
        refs.pointer.current.y
      );
  });

  return (
    <mesh position={[0, 0, -5]} scale={[19, 11, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={SMOKE_VERT}
        fragmentShader={SMOKE_FRAG}
      />
    </mesh>
  );
}

/* ---------------- The Monolith (procedural mascot) ---------------- */

function Monolith({ refs, reduced }: { refs: SceneRefs; reduced: boolean }) {
  const { viewport } = useThree();
  const scrollGroup = useRef<THREE.Group>(null);
  const tiltGroup = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const shardsRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  // Responsive horizontal positioning: on wide displays (desktop/laptops),
  // place the 3D monolith in the right column (~65-70% across) to fill the empty space
  // and give breathing room to the editorial headline on the left.
  // On mobile/narrow viewports (viewport.width <= 5.5), keep it centered.
  const posX =
    viewport.width > 5.5
      ? Math.min(1.4, (viewport.width - 4.16) * 0.38 + 0.5)
      : 0;

  // Sculpted silhouette for the lathe body.
  const profile = useMemo(() => {
    const shape: [number, number][] = [
      [0.0, -1.7],
      [0.52, -1.66],
      [0.68, -1.35],
      [0.6, -0.55],
      [0.4, 0.15],
      [0.46, 0.8],
      [0.68, 1.3],
      [0.62, 1.52],
      [0.0, 1.56],
    ];
    return shape.map(([x, y]) => new THREE.Vector2(x, y));
  }, []);

  const shards = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return {
          key: i,
          base: [Math.cos(a) * 1.5, -0.5 + (i % 3) * 0.55, Math.sin(a) * 1.5] as [
            number,
            number,
            number
          ],
          champagne: i === 0,
        };
      }),
    []
  );

  useFrame((state, raw) => {
    const delta = Math.min(raw, 0.05);
    const t = state.clock.elapsedTime;
    const { pointer, scroll } = refs;
    const sg = scrollGroup.current;
    const tg = tiltGroup.current;

    if (sg && !reduced) {
      // Gentle scroll response: slow rotation and a slight sink.
      const s = Math.min(scroll.current / window.innerHeight, 1);
      sg.rotation.y = s * 0.7;
      sg.position.y = -s * 0.55;
    }
    if (tg) {
      const tx = pointer.current.x * 0.5;
      const ty = pointer.current.y * 0.24;
      if (!reduced) {
        tg.rotation.y += (tx - tg.rotation.y) * (1 - Math.exp(-2.2 * delta));
        tg.rotation.x += (ty - tg.rotation.x) * (1 - Math.exp(-2.2 * delta));
        tg.position.y = Math.sin(t * 0.7) * 0.14;
      }
    }
    if (ringRef.current && !reduced) {
      ringRef.current.rotation.z = t * 0.12;
      ringRef.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.2) * 0.08;
    }
    if (shardsRef.current && !reduced) {
      shardsRef.current.rotation.y = t * 0.1;
      shardsRef.current.children.forEach((child, i) => {
        const s = shards[i];
        if (s) child.position.y = s.base[1] + Math.sin(t * 0.8 + i * 1.7) * 0.16;
      });
    }
    if (orbRef.current && !reduced) {
      orbRef.current.position.y = 2.1 + Math.sin(t * 0.9) * 0.08;
      orbRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group position={[posX, 0, 0]}>
      <group ref={scrollGroup}>
        <group ref={tiltGroup}>
          {/* Sculpted obsidian body */}
          <mesh castShadow>
            <latheGeometry args={[profile, 64]} />
            <meshStandardMaterial
              color={OBSIDIAN}
              metalness={0.65}
              roughness={0.22}
              envMapIntensity={1.4}
            />
          </mesh>
          {/* Thin champagne seam detail */}
          <mesh position={[0, -0.05, 0.6]}>
            <boxGeometry args={[0.012, 2.5, 0.012]} />
            <meshStandardMaterial
              color={CHAMPAGNE}
              metalness={0.9}
              roughness={0.3}
              emissive={CHAMPAGNE}
              emissiveIntensity={0.08}
            />
          </mesh>
          {/* Champagne orbit ring */}
          <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[1.5, 0.016, 12, 128]} />
            <meshStandardMaterial color={CHAMPAGNE} metalness={0.9} roughness={0.25} />
          </mesh>
          {/* Orbiting shards */}
          <group ref={shardsRef}>
            {shards.map((s) => (
              <mesh key={s.key} position={s.base}>
                <dodecahedronGeometry args={[0.07, 0]} />
                <meshStandardMaterial
                  color={s.champagne ? CHAMPAGNE : MOCHA}
                  metalness={0.7}
                  roughness={0.35}
                />
              </mesh>
            ))}
          </group>
          {/* Floating champagne orb above the monolith */}
          <mesh ref={orbRef} position={[0, 2.1, 0]}>
            <icosahedronGeometry args={[0.11, 1]} />
            <meshStandardMaterial
              color={CHAMPAGNE}
              metalness={0.85}
              roughness={0.25}
              emissive={CHAMPAGNE}
              emissiveIntensity={0.12}
            />
          </mesh>
        </group>
      </group>
      <ContactShadows
        position={[0, -1.95, 0]}
        opacity={0.55}
        scale={9}
        blur={2.6}
        far={3}
        color="#000000"
      />
    </group>
  );
}

/* ---------------- Canvas ---------------- */

export default function MascotScene({
  refs,
  reduced,
}: {
  refs: SceneRefs;
  reduced: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.1, 6.4], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.35} color={IVORY} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color={IVORY} />
      <pointLight
        position={[-4, 1, 3]}
        intensity={10}
        color={CHAMPAGNE}
        distance={12}
      />
      <Environment resolution={128}>
        <Lightformer
          intensity={1.6}
          position={[0, 5, 0]}
          scale={[10, 10, 1]}
          rotation-x={Math.PI / 2}
          color={IVORY}
        />
        <Lightformer
          intensity={1.1}
          color={CHAMPAGNE}
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[16, 1.5, 1]}
        />
        <Lightformer
          intensity={0.6}
          color="#6b5a44"
          position={[5, -1, -1]}
          rotation-y={-Math.PI / 2}
          scale={[16, 1.5, 1]}
        />
      </Environment>
      <Smoke refs={refs} reduced={reduced} />
      <Monolith refs={refs} reduced={reduced} />
    </Canvas>
  );
}
