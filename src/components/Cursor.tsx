import { useEffect, useRef, useState } from "react";

/**
 * Subtle custom cursor: a small champagne dot with a lagging ring.
 * Only mounts for fine pointers with no reduced-motion preference, and the
 * native cursor stays untouched so text selection is never interfered with.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      targetScale = t?.closest("a, button, [role='button']") ? 1.8 : 1;
    };

    const tick = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      scale += (targetScale - scale) * 0.12;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden>
      <div
        ref={dotRef}
        className="absolute h-1 w-1 rounded-full bg-primary/90"
      />
      <div
        ref={ringRef}
        className="absolute h-7 w-7 rounded-full border border-primary/35"
      />
    </div>
  );
}
