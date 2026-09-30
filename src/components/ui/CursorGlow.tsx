import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type CursorMode = 'default' | 'link' | 'view' | 'explore';

interface CursorState {
  mode: CursorMode;
  label: string;
}

export const CursorContext = {
  setMode: (_mode: CursorMode, _label?: string) => {},
  clear: () => {},
};

export function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({ mode: 'default', label: '' });

  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 34, mass: 0.3 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 34, mass: 0.3 });

  // expose imperative API via ref so interactive elements can change the cursor
  const apiRef = useRef({
    setMode: (mode: CursorMode, label = '') => setState({ mode, label }),
    clear: () => setState({ mode: 'default', label: '' }),
  });

  useEffect(() => {
    CursorContext.setMode = apiRef.current.setMode;
    CursorContext.clear = apiRef.current.clear;
  }, []);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.classList.remove('custom-cursor');
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  const isExpanded = state.mode !== 'default';

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          width: isExpanded ? 76 : 8,
          height: isExpanded ? 76 : 8,
          backgroundColor: isExpanded ? 'rgba(24,217,255,0.08)' : 'rgba(245,247,250,0.9)',
          borderColor: isExpanded
            ? state.mode === 'view'
              ? 'rgba(24,217,255,0.7)'
              : state.mode === 'explore'
                ? 'rgba(139,92,246,0.7)'
                : 'rgba(245,247,250,0.5)'
            : 'rgba(245,247,250,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="flex items-center justify-center rounded-full border backdrop-blur-[2px]"
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[10px] uppercase tracking-ultra text-ivory"
          >
            {state.label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
