import { useEffect, useRef, type CSSProperties } from 'react';
import { createMascot } from './createMascot';
import type { MascotOptions } from './types';

export interface MascotProps extends MascotOptions {
  className?: string;
  style?: CSSProperties;
  /** Accessible description. */
  label?: string;
}

/** Fills its parent box. Size and position it with CSS. */
export function Mascot({
  className,
  style,
  label = 'Aurum, an interactive 3D mascot',
  pauseWhenHidden,
  maxPixelRatio,
  scale = 1,
}: MascotProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = createMascot(el, { pauseWhenHidden, maxPixelRatio, scale });
    return () => handle?.dispose();
  }, [pauseWhenHidden, maxPixelRatio, scale]);

  return <div ref={ref} className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }} role="img" aria-label={label} />;
}

export default Mascot;

