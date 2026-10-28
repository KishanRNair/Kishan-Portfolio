import { useEffect, useState } from "react";

/** Client-side WebGL availability check (safe: browser-only, call in effects). */
export function useWebGL(): boolean {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setSupported(
        !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl2") || canvas.getContext("webgl"))
        )
      );
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}
