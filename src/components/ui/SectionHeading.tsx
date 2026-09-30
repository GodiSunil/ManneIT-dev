import { type ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  index?: string;
  children: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  index,
  children,
  description,
  className = '',
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-6 ${align === 'center' ? 'items-center text-center' : 'items-start'} ${className}`}>
      {(eyebrow || index) && (
        <Reveal>
          <div className="flex items-center gap-4">
            {index && <span className="font-mono text-xs tracking-ultra text-cyan">{index}</span>}
            {eyebrow && (
              <span className="font-mono text-xs uppercase tracking-ultra text-muted">{eyebrow}</span>
            )}
            <span className="h-px w-10 bg-gradient-to-r from-cyan/60 to-transparent" />
          </div>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tighter text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
          {children}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={`max-w-xl text-base leading-relaxed text-muted sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
