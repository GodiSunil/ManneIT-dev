import { type ReactNode, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

export function Reveal({ children, className, delay = 0, y = 28, once = true }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' });
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}
