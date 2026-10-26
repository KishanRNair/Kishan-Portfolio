import { useState, useEffect } from 'react';

export function useParallax(factor = 0.2) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setOffsetY(window.scrollY * factor);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [factor]);

  return offsetY;
}
