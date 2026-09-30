import { useRef, type ReactNode, type CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}

export function Magnetic({ children, strength = 0.3, className, style, ...rest }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
