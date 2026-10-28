import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { ProjectVisual as VisualKey } from "@/data/projects";
import { useWebGL } from "@/hooks/useWebGL";

/**
 * Interactive project preview treatments. Each project picks one via its
 * `visual` field in src/data/projects.ts. WebGL variants lazy-load a small
 * R3F scene and fall back to a styled CSS composition when unavailable.
 * Replace any of these with your own GLB models or screenshots later.
 */

const MiniScene = lazy(() => import("./project-scenes/MiniScene"));

/* ---------- 2.5D: browser mockup that tilts with the cursor ---------- */

function TiltBrowser() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty("--tilt-y", `${px * 10}deg`);
    ref.current.style.setProperty("--tilt-x", `${-py * 8}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--tilt-y", "0deg");
    ref.current?.style.setProperty("--tilt-x", "0deg");
  };

  return (
    <div className="scene-3d flex h-full w-full items-center justify-center p-6 md:p-10">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="scene-3d-inner w-full max-w-md rounded-lg border border-border bg-secondary shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
          <span className="ml-3 flex h-5 flex-1 items-center rounded-sm bg-muted/70 px-2 text-[10px] text-muted-foreground">
            placeholder-project.dev
          </span>
        </div>
        <div className="space-y-3 p-5" style={{ transform: "translateZ(34px)" }}>
          <div
            className="h-24 rounded-md"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.32 0.05 60), oklch(0.24 0.015 80))",
            }}
          />
          <div className="h-3 w-2/3 rounded bg-muted-foreground/30" />
          <div className="h-3 w-1/2 rounded bg-muted-foreground/20" />
          <div className="flex gap-2 pt-1" style={{ transform: "translateZ(24px)" }}>
            <div className="h-6 w-16 rounded-sm bg-primary/80" />
            <div className="h-6 w-16 rounded-sm border border-border" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2.5D: layered composition with scroll depth ---------- */

function DepthLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [46, -46]);
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const y3 = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const style = reduced ? undefined : { rotateY: rotate };

  return (
    <div ref={ref} className="scene-3d flex h-full w-full items-center justify-center p-8">
      <motion.div className="relative h-full w-full max-w-sm" style={style}>
        <motion.div
          className="absolute left-2 top-4 h-44 w-44 rounded-lg border border-primary/35"
          style={reduced ? undefined : { y: y2 }}
        />
        <motion.div
          className="absolute right-2 top-1/4 h-48 w-48 rounded-lg border border-border bg-secondary"
          style={reduced ? undefined : { y: y1 }}
        />
        <motion.div
          className="absolute bottom-8 left-6 right-6 h-24 rounded-lg border border-border bg-card shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65)]"
          style={reduced ? undefined : { y: y3 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl italic text-primary/80">Aa</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Fallback for WebGL variants ---------- */

function GLFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-44 w-44 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 30%, oklch(0.36 0.03 80), oklch(0.2 0.01 80))",
          boxShadow:
            "inset -12px -16px 34px rgba(0,0,0,0.6), 0 24px 60px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

/* ---------- Dispatcher ---------- */

export function ProjectVisual({
  visual,
  className,
}: {
  visual: VisualKey;
  className?: string;
}) {
  const webgl = useWebGL();
  const [mounted, setMounted] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => setMounted(true), []);

  const onPointerMove = (e: React.PointerEvent) => {
    pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  let body: ReactNode;
  if (visual === "tilt-browser") {
    body = <TiltBrowser />;
  } else if (visual === "depth-layers") {
    body = <DepthLayers />;
  } else if (mounted && webgl) {
    body = (
      <Suspense fallback={<GLFallback />}>
        <MiniScene variant={visual} pointer={pointerRef} />
      </Suspense>
    );
  } else {
    body = <GLFallback />;
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={`relative overflow-hidden rounded-xl border border-border bg-card ${className ?? ""}`}
    >
      {body}
      <span className="eyebrow absolute bottom-3 left-4 z-10 text-[0.58rem] text-muted-foreground/70">
        Placeholder visual — replace with your own scene
      </span>
    </div>
  );
}
