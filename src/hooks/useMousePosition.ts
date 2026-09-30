import { useEffect, useRef, useState } from 'react';

export function useMousePosition() {
  const pos = useRef({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      raf = requestAnimationFrame(() => setTick((t) => t + 1));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { pos, tick };
}
