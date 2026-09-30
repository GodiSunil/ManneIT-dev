import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Reason {
  num: string;
  title: string;
  short: string;
  long: string;
  color: string;
}

const reasons: Reason[] = [
  {
    num: '01',
    title: 'Creative Thinking',
    short: 'We approach problems like a design studio, not a factory.',
    long: 'Every engagement starts with curiosity. We reframe the problem, explore divergent directions, and resist generic solutions — so the work stands apart instead of blending in.',
    color: '#8B5CF6',
  },
  {
    num: '02',
    title: 'Modern Engineering',
    short: 'Production-grade code, built to evolve.',
    long: 'Type-safe architectures, modern frameworks and thoughtful abstractions. The result is software that performs today and can be maintained and extended confidently tomorrow.',
    color: '#18D9FF',
  },
  {
    num: '03',
    title: 'End-to-End Capability',
    short: 'Strategy, design, build, launch and growth — one team.',
    long: 'No handoff gaps. The people who shape the strategy design and build the product, which means decisions stay coherent from first sketch to shipped feature.',
    color: '#FFB000',
  },
  {
    num: '04',
    title: 'User-Centered Design',
    short: 'Real people are always in the room.',
    long: 'Research, prototyping and iteration ground every interface in how people actually behave — not assumptions. The outcome is experiences that feel intuitive on first use.',
    color: '#18D9FF',
  },
  {
    num: '05',
    title: 'Built for Growth',
    short: 'We design systems that scale with your ambition.',
    long: 'From architecture to brand, we build with the next stage in mind — so launching is a starting line, not a ceiling, and the work keeps compounding as you grow.',
    color: '#8B5CF6',
  },
];

export function WhyManne() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const active = reasons[open ?? 0];

  return (
    <section className="relative w-full overflow-hidden py-28 lg:py-40">
      {/* background visual that shifts with the active row */}
      <motion.div
        animate={{ backgroundColor: `${active.color}06` }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute inset-0 -z-10"
      />
      <motion.div
        key={`bg-${active.num}`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-[50vh] w-[40vw] rounded-full blur-[160px]"
        style={{ backgroundColor: `${active.color}12` }}
      />

      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        <SectionHeading
          index="05"
          eyebrow="Why Us"
          description="Five reasons teams choose to build with us — and stay."
          className="mb-16 lg:mb-20"
        >
          WHY BUILD
          <br />
          WITH MANNE?
        </SectionHeading>

        <div className="border-t border-white/[0.06]">
          {reasons.map((r, i) => {
            const isOpen = open === i;
            return (
              <div key={r.num} className="relative border-b border-white/[0.06]">
                {/* accent line that animates on hover/open */}
                <motion.span
                  className="absolute left-0 top-0 h-full w-px"
                  style={{ backgroundColor: r.color }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  onMouseEnter={() => !reduced && setOpen(i)}
                  className="group relative flex w-full items-center gap-6 py-8 text-left transition-all duration-500 lg:gap-12 lg:py-10"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-mono text-sm transition-all duration-500"
                    style={{
                      color: isOpen ? r.color : 'rgba(156,163,175,0.4)',
                      transform: isOpen ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    {r.num}
                  </span>
                  <span
                    className="flex-1 font-display text-3xl font-semibold tracking-tight transition-all duration-500 sm:text-4xl lg:text-5xl xl:text-6xl"
                    style={{
                      color: isOpen ? '#F5F7FA' : 'rgba(156,163,175,0.65)',
                      transform: isOpen ? 'translateX(8px)' : 'translateX(0)',
                    }}
                  >
                    {r.title}
                  </span>
                  <span
                    className="hidden text-sm transition-all duration-500 md:block"
                    style={{ color: isOpen ? r.color : 'rgba(156,163,175,0.5)', opacity: isOpen ? 1 : 0 }}
                  >
                    {r.short}
                  </span>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
                    style={{
                      borderColor: isOpen ? r.color : 'rgba(255,255,255,0.1)',
                      color: isOpen ? r.color : '#9CA3AF',
                    }}
                  >
                    <span className={`text-lg transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-10 pl-12 text-base leading-relaxed text-muted lg:pl-[4.5rem] lg:text-lg">
                        {r.long}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
