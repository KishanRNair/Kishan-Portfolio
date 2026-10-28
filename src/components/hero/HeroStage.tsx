import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useWebGL } from "@/hooks/useWebGL";

/**
 * Client-only hero stage. Tracks pointer + scroll in refs (no re-renders),
 * lazy-loads the WebGL scene after mount, and always renders a CSS
 * atmospheric fallback beneath it so the hero is never empty — including
 * when WebGL is unavailable.
 */
const MascotScene = lazy(() => import("./MascotScene"));

export function HeroStage({ className }: { className?: string }) {
  const webgl = useWebGL();
  const [mounted, setMounted] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const reduced = !!useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={className} aria-hidden>
      {/* CSS atmosphere — the graceful fallback and idle backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="drift-slow absolute -left-[15%] top-[15%] h-[55vmax] w-[55vmax] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.32 0.05 60 / 40%), transparent)",
          }}
        />
        <div
          className="drift-slower absolute -right-[10%] bottom-[-10%] h-[50vmax] w-[50vmax] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.26 0.02 80 / 45%), transparent)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.2 0.012 80 / 55%), transparent 70%)",
          }}
        />
      </div>

      {mounted && webgl && (
        <Suspense fallback={null}>
          <MascotScene
            refs={{ pointer: pointerRef, scroll: scrollRef }}
            reduced={reduced}
          />
        </Suspense>
      )}
    </div>
  );
}
