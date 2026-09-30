import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Node {
  id: string;
  label: string;
  angle: number;
  color: string;
  blurb: string;
}

const nodes: Node[] = [
  { id: 'strategy', label: 'Strategy', angle: -90, color: '#18D9FF', blurb: 'Roadmaps, positioning and product strategy that anchor every decision.' },
  { id: 'design', label: 'Design', angle: -38, color: '#8B5CF6', blurb: 'UI/UX, brand and visual systems designed with editorial precision.' },
  { id: 'development', label: 'Development', angle: 14, color: '#18D9FF', blurb: 'Web, mobile and platform engineering built to production standard.' },
  { id: 'ai', label: 'AI', angle: 64, color: '#8B5CF6', blurb: 'LLM integration, RAG pipelines and custom ML powering real features.' },
  { id: 'security', label: 'Security', angle: 116, color: '#18D9FF', blurb: 'Hardening, audits and monitoring that keep products safe by design.' },
  { id: 'marketing', label: 'Marketing', angle: 166, color: '#FFB000', blurb: 'Performance marketing and content that turns reach into growth.' },
  { id: 'media', label: 'Media', angle: 218, color: '#FFB000', blurb: 'Motion, video and post-production crafted for cinematic impact.' },
];

const R = 210;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export function TechCreativity() {
  const [hover, setHover] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const active = nodes.find((n) => n.id === hover);

  return (
    <section className="relative w-full overflow-hidden py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.05] blur-[170px]" />
      </div>

      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="The System"
          description="One connected practice spanning strategy, design, engineering, AI and media — orchestrated around a single creative-technical core."
          className="mb-16 lg:mb-24"
          align="center"
        >
          TECHNOLOGY
          <br />
          MEETS CREATIVITY.
        </SectionHeading>

        <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center sm:max-w-[620px] lg:max-w-[680px]">
          {/* orbit rings */}
          <div className="absolute inset-0 m-auto h-[420px] w-[420px] rounded-full border border-white/[0.06] sm:h-[480px] sm:w-[480px] lg:h-[560px] lg:w-[560px]" />
          <div className="absolute inset-0 m-auto h-[300px] w-[300px] rounded-full border border-white/[0.04] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px]" />
          <div className="absolute inset-0 m-auto h-[160px] w-[160px] rounded-full border border-white/[0.03]" />

          {!reduced && (
            <>
              <motion.div
                className="absolute inset-0 m-auto h-[420px] w-[420px] rounded-full border border-dashed border-cyan/15 sm:h-[480px] sm:w-[480px] lg:h-[560px] lg:w-[560px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 m-auto h-[300px] w-[300px] rounded-full border border-dashed border-violet/10 sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          {/* connections */}
          <svg className="absolute inset-0 m-auto h-full w-full" viewBox="-340 -340 680 680" aria-hidden>
            {nodes.map((n) => {
              const p = polar(n.angle, R);
              const isActive = hover === n.id;
              return (
                <line
                  key={n.id}
                  x1={0}
                  y1={0}
                  x2={p.x}
                  y2={p.y}
                  stroke={isActive ? n.color : 'rgba(255,255,255,0.08)'}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeOpacity={isActive ? 0.8 : 1}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* center node */}
          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-cyan/30 bg-gradient-to-br from-cyan/25 to-violet/15 backdrop-blur-sm sm:h-32 sm:w-32 lg:h-36 lg:w-36">
            {!reduced && (
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan/40"
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <div className="text-center">
              <div className="font-display text-base font-bold tracking-tight text-ivory sm:text-lg">MANNE</div>
              <div className="font-mono text-[8px] uppercase tracking-ultra text-cyan sm:text-[9px]">IT Core</div>
            </div>
          </div>

          {/* orbit nodes */}
          {nodes.map((n) => {
            const p = polar(n.angle, R);
            const isActive = hover === n.id;
            return (
              <button
                key={n.id}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(n.id)}
                onBlur={() => setHover(null)}
                className="absolute z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-navy-900/80 backdrop-blur-sm transition-all duration-500 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
                style={{
                  left: `calc(50% + ${p.x}px)`,
                  top: `calc(50% + ${p.y}px)`,
                  borderColor: isActive ? n.color : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive ? `0 0 44px -10px ${n.color}` : 'none',
                }}
                aria-label={n.label}
              >
                <span
                  className="font-display text-sm font-medium tracking-tight transition-colors duration-500 sm:text-base"
                  style={{ color: isActive ? '#F5F7FA' : '#9CA3AF' }}
                >
                  {n.label}
                </span>
                {isActive && <span className="mt-1 h-1 w-1 rounded-full" style={{ backgroundColor: n.color }} />}
              </button>
            );
          })}
        </div>

        {/* blurb */}
        <div className="mx-auto mt-12 min-h-[72px] max-w-md text-center">
          <motion.p
            key={active?.id ?? 'default'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm leading-relaxed text-muted sm:text-base"
          >
            {active ? (
              <>
                <span className="font-display text-ivory">{active.label}. </span>
                {active.blurb}
              </>
            ) : (
              'Hover a node to explore how each discipline connects to the core.'
            )}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
