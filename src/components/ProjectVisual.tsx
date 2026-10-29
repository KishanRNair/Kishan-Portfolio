import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { Project, ProjectVisual as VisualKey } from "@/data/projects";
import { useWebGL } from "@/hooks/useWebGL";

const MiniScene = lazy(() => import("./project-scenes/MiniScene"));

/* ---------- 2.5D Layered Device Showcase (with Real Screenshots & Brand Ambient Glow) ---------- */

function LayeredShowcase({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty("--tilt-y", `${px * 14}deg`);
    ref.current.style.setProperty("--tilt-x", `${-py * 10}deg`);
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--tilt-y", "0deg");
    ref.current.style.setProperty("--tilt-x", "0deg");
  };

  const desktopImg = project.images?.desktop;
  const mobileImg = project.images?.mobile;
  const urlDisplay = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "")
    : `${project.slug}.dev`;

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="scene-3d relative flex h-full w-full items-center justify-center overflow-hidden p-4 sm:p-6 md:p-10"
    >
      {/* Brand-tailored volumetric ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(10, 54, 99, 0.55), rgba(14, 116, 144, 0.22) 40%, transparent 75%)",
        }}
      />

      {/* Main 3D tilt stage */}
      <div ref={ref} className="scene-3d-inner relative w-full max-w-lg">
        {/* Desktop Browser Frame (Back Layer) */}
        <div className="relative overflow-hidden rounded-xl border border-white/12 bg-[#0d121c]/95 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
          {/* Browser Top Bar */}
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#141b27]/80 px-3.5 py-2.5 backdrop-blur-md">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80" />
            <div className="ml-3 flex h-5 flex-1 max-w-[220px] items-center gap-1.5 rounded-full bg-white/5 px-2.5 text-[10px] text-white/50 ring-1 ring-white/10">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="opacity-70"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="truncate">{urlDisplay}</span>
            </div>
          </div>

          {/* Desktop Screenshot */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
            {desktopImg ? (
              <img
                src={desktopImg}
                alt={`${project.title} Desktop View`}
                className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                Desktop Preview
              </div>
            )}
            {/* Subtle specular sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          </div>
        </div>

        {/* Floating Mobile Device Mockup (Front Layer) */}
        {mobileImg && (
          <div
            className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 md:-right-6 w-[28%] min-w-[105px] max-w-[155px] overflow-hidden rounded-[18px] sm:rounded-[22px] border-[2.5px] border-[#2a3649] bg-[#0c1017] p-1 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/15"
            style={{
              transform: "translateZ(52px)",
            }}
          >
            {/* Dynamic island speaker pill */}
            <div className="absolute left-1/2 top-1.5 z-20 h-1.5 w-7 -translate-x-1/2 rounded-full bg-black/80 ring-1 ring-white/10" />

            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[14px] sm:rounded-[17px] bg-slate-950">
              <img
                src={mobileImg}
                alt={`${project.title} Mobile View`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              {/* Screen reflection */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- 2.5D: browser mockup placeholder ---------- */

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

export interface ProjectVisualProps {
  visual: VisualKey;
  project?: Project;
  className?: string;
}

export function ProjectVisual({
  visual,
  project,
  className,
}: ProjectVisualProps) {
  const webgl = useWebGL();
  const [mounted, setMounted] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => setMounted(true), []);

  const onPointerMove = (e: React.PointerEvent) => {
    pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  const hasCustomImages = Boolean(project?.images?.desktop || project?.images?.mobile);

  let body: ReactNode;
  if (hasCustomImages && project) {
    body = <LayeredShowcase project={project} />;
  } else if (visual === "tilt-browser") {
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
      {!hasCustomImages && (
        <span className="eyebrow absolute bottom-3 left-4 z-10 text-[0.58rem] text-muted-foreground/70">
          Placeholder visual — replace with your own scene
        </span>
      )}
    </div>
  );
}
