import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export function PrimaryButton({ children, href, onClick, className = '', icon }: PrimaryButtonProps) {
  const reduced = useReducedMotion();
  const content = (
    <span className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-cyan px-7 py-3.5 text-sm font-medium text-navy-950 transition-colors duration-300">
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-cyan-deep via-cyan to-violet opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon ?? <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />}
      </span>
    </span>
  );

  return (
    <Magnetic strength={0.25} className={className}>
      {href ? (
        <a href={href} onClick={onClick} className="block">
          {content}
        </a>
      ) : (
        <motion.button
          onClick={onClick}
          whileTap={reduced ? undefined : { scale: 0.97 }}
        >
          {content}
        </motion.button>
      )}
    </Magnetic>
  );
}

interface GhostButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function GhostButton({ children, href, onClick, className = '' }: GhostButtonProps) {
  const inner = (
    <span className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-ivory transition-all duration-300 hover:border-cyan/60 hover:bg-white/[0.03]">
      <span className="absolute left-5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan transition-all duration-300 group-hover:scale-125" />
      <span className="pl-3">{children}</span>
    </span>
  );

  return (
    <Magnetic strength={0.18} className={className}>
      {href ? (
        <a href={href} onClick={onClick} className="block">
          {inner}
        </a>
      ) : (
        <button onClick={onClick} className="block">
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
