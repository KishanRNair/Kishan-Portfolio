import { useRef, useEffect, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================================================================
   CONSTANTS & PALETTE
   ========================================================================= */
const C = {
  desk: "#1a1614",
  deskSpec: "#2a2422",
  body: "#18181a",
  bodySpec: "#2c2c2f",
  screen: "#050706",
  keyBase: "#1d1f21",
  keyCap: "#282b2f",
  keyCapAlt: "#202225",
  mouseBody: "#1c1e20",
  emerald: "#34d399",
  emeraldDim: "#0d2e1e",
  ivory: "#f3ebdd",
  gold: "#b59a6a",
};

/* =========================================================================
   MONITOR SCREEN (video texture / fallback image texture)
   ========================================================================= */
function MonitorScreen({ width, height }: { width: number; height: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
  const fallback = useTexture("/projects/sustainability/landing-hero.png");

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/projects/sustainability/demo.mp4";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    const tex = new THREE.VideoTexture(video);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace;

    const tryPlay = () => {
      video
        .play()
        .then(() => {
          setVideoTexture(tex);
        })
        .catch(() => {
          // video not available yet — smoothly fall back to landing-hero.png
        });
    };

    video.addEventListener("canplaythrough", tryPlay, { once: true });
    video.load();

    return () => {
      video.pause();
      video.src = "";
      tex.dispose();
    };
  }, []);

  const activeTexture = videoTexture ?? fallback;

  return (
    <mesh ref={meshRef} position={[0, 0, 0.005]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={activeTexture} toneMapped={false} />
    </mesh>
  );
}

/* =========================================================================
   SINGLE KEY
   ========================================================================= */
function Key({
  position,
  width = 0.075,
  height = 0.065,
  color = C.keyCap,
  emissive = false,
}: {
  position: [number, number, number];
  width?: number;
  height?: number;
  color?: string;
  emissive?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const pressed = useRef(false);
  const pressAnim = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = pressed.current ? 1 : 0;
    pressAnim.current = THREE.MathUtils.lerp(pressAnim.current, target, 12 * delta);
    ref.current.position.y = position[1] - pressAnim.current * 0.012;
    ref.current.scale.y = 1 - pressAnim.current * 0.15;
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation();
        pressed.current = true;
      }}
      onPointerUp={() => {
        pressed.current = false;
      }}
      onPointerLeave={() => {
        pressed.current = false;
      }}
    >
      <RoundedBox args={[width, 0.018, height]} radius={0.008} smoothness={2}>
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.6}
          emissive={emissive ? C.emerald : "#000000"}
          emissiveIntensity={emissive ? 0.5 : 0}
        />
      </RoundedBox>
    </mesh>
  );
}

/* =========================================================================
   KEYBOARD
   ========================================================================= */
function Keyboard({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const hovered = useRef(false);
  const liftAnim = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = hovered.current ? 1 : 0;
    liftAnim.current = THREE.MathUtils.lerp(liftAnim.current, target, 8 * delta);
    groupRef.current.position.y = position[1] + liftAnim.current * 0.04;
  });

  const rows = [
    // Function row
    ...["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "DEL"].map(
      (k, i) => ({
        k,
        x: -0.54 + i * 0.083,
        z: -0.14,
        w: 0.072,
        h: 0.055,
        color: C.keyCapAlt,
        emissive: k === "DEL",
      })
    ),
    // Numbers
    ...["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="].map((k, i) => ({
      k,
      x: -0.48 + i * 0.083,
      z: -0.07,
      w: 0.072,
      h: 0.065,
      color: C.keyCap,
      emissive: false,
    })),
    // QWERTY
    ...["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((k, i) => ({
      k,
      x: -0.37 + i * 0.083,
      z: 0,
      w: 0.072,
      h: 0.065,
      color: C.keyCap,
      emissive: false,
    })),
    // ASDF
    ...["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"].map((k, i) => ({
      k,
      x: -0.35 + i * 0.083,
      z: 0.07,
      w: 0.072,
      h: 0.065,
      color: C.keyCap,
      emissive: false,
    })),
    // ZXCV
    ...["Z", "X", "C", "V", "B", "N", "M", ",", "."].map((k, i) => ({
      k,
      x: -0.32 + i * 0.083,
      z: 0.14,
      w: 0.072,
      h: 0.065,
      color: C.keyCap,
      emissive: false,
    })),
    // Enter (emerald glow)
    { k: "↵", x: 0.47, z: 0.07, w: 0.11, h: 0.065, color: "#0d2e1e", emissive: true },
    // Spacebar
    { k: "SPACE", x: 0.0, z: 0.21, w: 0.45, h: 0.065, color: "#2d3035", emissive: false },
    // Side modifiers
    { k: "TAB", x: -0.49, z: 0, w: 0.1, h: 0.065, color: C.keyCapAlt, emissive: false },
    { k: "CAPS", x: -0.49, z: 0.07, w: 0.105, h: 0.065, color: C.keyCapAlt, emissive: false },
    { k: "⇧", x: -0.46, z: 0.14, w: 0.14, h: 0.065, color: C.keyCapAlt, emissive: false },
    { k: "CTRL", x: -0.49, z: 0.21, w: 0.08, h: 0.065, color: C.keyCapAlt, emissive: false },
    { k: "CMD", x: -0.39, z: 0.21, w: 0.08, h: 0.065, color: C.keyCapAlt, emissive: false },
    { k: "OPT", x: -0.29, z: 0.21, w: 0.08, h: 0.065, color: C.keyCapAlt, emissive: false },
  ] as const;

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => {
        hovered.current = true;
      }}
      onPointerLeave={() => {
        hovered.current = false;
      }}
    >
      {/* Keyboard body */}
      <RoundedBox args={[1.22, 0.028, 0.44]} radius={0.018} smoothness={3} position={[0, 0, 0]}>
        <meshStandardMaterial color={C.keyBase} metalness={0.2} roughness={0.7} />
      </RoundedBox>
      {/* Emerald RGB underglow strip */}
      <mesh position={[0, -0.015, 0.14]}>
        <boxGeometry args={[1.18, 0.003, 0.008]} />
        <meshBasicMaterial color={C.emerald} toneMapped={false} />
      </mesh>
      <pointLight position={[0, -0.02, 0.15]} color={C.emerald} intensity={0.4} distance={0.8} />

      {/* Keys */}
      {rows.map((row, i) => (
        <Key
          key={i}
          position={[row.x, 0.022, row.z]}
          width={row.w}
          height={row.h}
          color={row.color}
          emissive={row.emissive}
        />
      ))}
    </group>
  );
}

/* =========================================================================
   MOUSE
   ========================================================================= */
function MouseDevice({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const hovered = useRef(false);
  const tiltAnim = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = hovered.current ? 1 : 0;
    tiltAnim.current = THREE.MathUtils.lerp(tiltAnim.current, target, 8 * delta);
    groupRef.current.rotation.z = tiltAnim.current * 0.06;
    groupRef.current.position.y = position[1] + tiltAnim.current * 0.025;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => {
        hovered.current = true;
      }}
      onPointerLeave={() => {
        hovered.current = false;
      }}
    >
      <RoundedBox args={[0.12, 0.035, 0.22]} radius={0.045} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color={C.mouseBody} metalness={0.5} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0.022, 0.02]}>
        <sphereGeometry args={[0.075, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <meshStandardMaterial color="#222426" metalness={0.3} roughness={0.3} />
      </mesh>
      {/* Scroll wheel */}
      <mesh position={[0, 0.026, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.014, 0.014, 0.038, 16]} />
        <meshStandardMaterial
          color={C.emeraldDim}
          emissive={C.emerald}
          emissiveIntensity={0.8}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
      <pointLight position={[0, 0.04, -0.04]} color={C.emerald} intensity={0.3} distance={0.3} />
      <mesh position={[0, 0.031, -0.06]}>
        <boxGeometry args={[0.001, 0.004, 0.09]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0.034, 0.06]}>
        <circleGeometry args={[0.008, 12]} />
        <meshStandardMaterial color={C.emerald} emissive={C.emerald} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

/* =========================================================================
   MONITOR — draggable tilt/pan & grounded stand
   ========================================================================= */
function Monitor({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const rotY = useRef(0);
  const rotX = useRef(-0.08);
  const targetRotY = useRef(0);
  const targetRotX = useRef(-0.08);

  const screenW = 2.2;
  const screenH = screenW * (10 / 16);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    rotY.current = THREE.MathUtils.lerp(rotY.current, targetRotY.current, 10 * delta);
    rotX.current = THREE.MathUtils.lerp(rotX.current, targetRotX.current, 10 * delta);
    groupRef.current.rotation.y = rotY.current;
    groupRef.current.rotation.x = rotX.current;
  });

  const onPointerDown = useCallback((e: THREE.Event) => {
    const evt = e as unknown as PointerEvent;
    e.stopPropagation?.();
    isDragging.current = true;
    prevPointer.current = { x: evt.clientX, y: evt.clientY };
  }, []);

  const onPointerMove = useCallback((e: THREE.Event) => {
    if (!isDragging.current) return;
    const evt = e as unknown as PointerEvent;
    const dx = evt.clientX - prevPointer.current.x;
    const dy = evt.clientY - prevPointer.current.y;
    prevPointer.current = { x: evt.clientX, y: evt.clientY };
    targetRotY.current = THREE.MathUtils.clamp(targetRotY.current + dx * 0.005, -0.6, 0.6);
    targetRotX.current = THREE.MathUtils.clamp(targetRotX.current + dy * 0.004, -0.35, 0.1);
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Outer frame (space-black aluminum) */}
      <RoundedBox args={[screenW + 0.18, screenH + 0.16, 0.055]} radius={0.025} smoothness={4}>
        <meshStandardMaterial
          color={C.body}
          metalness={0.85}
          roughness={0.12}
          envMapIntensity={1.2}
        />
      </RoundedBox>

      {/* Inner bezel */}
      <RoundedBox
        args={[screenW + 0.06, screenH + 0.05, 0.015]}
        radius={0.015}
        smoothness={3}
        position={[0, 0.005, 0.026]}
      >
        <meshStandardMaterial color="#060808" metalness={0.1} roughness={0.9} />
      </RoundedBox>

      {/* Screen background */}
      <mesh position={[0, 0.01, 0.034]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial color="#000" />
      </mesh>

      {/* Screen content (video / fallback image) */}
      <Suspense fallback={null}>
        <MonitorScreen width={screenW} height={screenH} />
      </Suspense>

      {/* Screen glass sheen */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[screenW + 0.04, screenH + 0.04]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.04}
          roughness={0.05}
          metalness={0.0}
        />
      </mesh>

      {/* Webcam dot */}
      <mesh position={[0, screenH / 2 + 0.055, 0.033]}>
        <circleGeometry args={[0.009, 12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, screenH / 2 + 0.055, 0.034]}>
        <circleGeometry args={[0.005, 12]} />
        <meshStandardMaterial color="#111d15" emissive="#34d399" emissiveIntensity={0.3} />
      </mesh>

      {/* Gold brand emblem */}
      <mesh position={[0, -(screenH / 2) - 0.045, 0.035]}>
        <circleGeometry args={[0.018, 16]} />
        <meshStandardMaterial
          color={C.gold}
          metalness={0.9}
          roughness={0.1}
          emissive={C.gold}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Stand arm */}
      <mesh position={[0, -(screenH / 2) - 0.22, -0.04]}>
        <cylinderGeometry args={[0.018, 0.024, 0.32, 16]} />
        <meshStandardMaterial color={C.bodySpec} metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Stand hinge block */}
      <mesh position={[0, -(screenH / 2) - 0.07, -0.012]}>
        <boxGeometry args={[0.07, 0.05, 0.06]} />
        <meshStandardMaterial color={C.body} metalness={0.85} roughness={0.1} />
      </mesh>

      {/* Stand base — seated flush on the desk */}
      <mesh position={[0, -(screenH / 2) - 0.375, -0.14]} rotation={[-0.15, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.28, 0.018, 32]} />
        <meshStandardMaterial color={C.bodySpec} metalness={0.75} roughness={0.18} />
      </mesh>

      {/* Emerald ambilight glow behind monitor */}
      <pointLight position={[0, 0, -0.3]} color={C.emerald} intensity={1.5} distance={3} />
      <pointLight position={[0, 0, -0.15]} color={C.emerald} intensity={0.6} distance={2} />
    </group>
  );
}

/* =========================================================================
   DESK SURFACE
   ========================================================================= */
function Desk() {
  return (
    <group>
      {/* Main desk top */}
      <RoundedBox args={[4.8, 0.06, 2.2]} radius={0.015} smoothness={3} position={[0, 0, 0]}>
        <meshStandardMaterial color={C.desk} metalness={0.05} roughness={0.55} />
      </RoundedBox>

      {/* Desk mat */}
      <mesh position={[0, 0.034, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 1.5]} />
        <meshStandardMaterial color="#0d0f10" roughness={0.92} metalness={0.0} />
      </mesh>

      {/* Desk mat border glow */}
      <mesh position={[0, 0.034, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.62, 1.52]} />
        <meshBasicMaterial color={C.emerald} transparent opacity={0.06} />
      </mesh>

      {/* Desk legs */}
      {[-1.9, 1.9].map((x) => (
        <mesh key={x} position={[x, -0.55, 0.85]}>
          <boxGeometry args={[0.06, 1.04, 0.06]} />
          <meshStandardMaterial color="#111" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}
      {[-1.9, 1.9].map((x) => (
        <mesh key={`b${x}`} position={[x, -0.55, -0.85]}>
          <boxGeometry args={[0.06, 1.04, 0.06]} />
          <meshStandardMaterial color="#111" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3.84, 0.04, 0.04]} />
        <meshStandardMaterial color="#111" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Screen glow spill onto mat */}
      <pointLight position={[0, 0.5, 0.3]} color={C.emerald} intensity={0.25} distance={2.5} />
    </group>
  );
}

/* =========================================================================
   SCENE WRAPPER (camera + lights + objects)
   ========================================================================= */
function Scene() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isNarrow = size.width < 640;
    camera.position.set(0, 2.2, isNarrow ? 7.6 : 6.5);
    camera.lookAt(0, 0.7, 0);
  }, [camera, size.width]);

  return (
    <>
      <ambientLight color="#1a1614" intensity={1.2} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={2.0}
        color="#f3ebdd"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#b59a6a" />
      <pointLight position={[0, 3, 2]} color="#ffffff" intensity={0.5} distance={10} />

      <Environment preset="studio" environmentIntensity={0.4} />

      <Desk />
      {/* Grounded monitor seated flush on table */}
      <Monitor position={[0, 1.1, -0.3]} />
      <Keyboard position={[-0.2, 0.075, 0.62]} />
      <MouseDevice position={[0.82, 0.058, 0.55]} />

      <ContactShadows
        position={[0, -0.03, 0]}
        opacity={0.7}
        scale={8}
        blur={2.5}
        far={3}
        color="#000000"
      />
    </>
  );
}

/* =========================================================================
   EXPORTED WORKSTATION SCENE COMPONENT
   ========================================================================= */
export default function WorkstationScene() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c0a08]">
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ fov: 45, near: 0.1, far: 100 }}
        style={{ width: "100%", height: "100%", background: "#0c0a08" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Subtle interaction pill overlay */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-black/60 px-2.5 py-1 text-[0.62rem] text-emerald-400 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D Workstation · Drag monitor to rotate</span>
      </div>
    </div>
  );
}

