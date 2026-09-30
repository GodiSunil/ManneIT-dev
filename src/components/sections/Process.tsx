import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Stage {
  num: string;
  title: string;
  description: string;
  color: string;
}

const stages: Stage[] = [
  { num: '01', title: 'Discover', color: '#18D9FF', description: 'We dig into goals, audience and constraints to define what success actually looks like.' },
  { num: '02', title: 'Strategize', color: '#18D9FF', description: 'A clear plan — scope, architecture, milestones — that turns ambition into an executable roadmap.' },
  { num: '03', title: 'Design', color: '#8B5CF6', description: 'Wireframes, prototypes and a visual system that make the product feel real before a line of code.' },
  { num: '04', title: 'Build', color: '#8B5CF6', description: 'Engineering with rigor — type-safe, tested and reviewed continuously as the product takes shape.' },
  { num: '05', title: 'Launch', color: '#FFB000', description: 'Deployment, QA and rollout handled end-to-end so launch day is calm, not chaotic.' },
  { num: '06', title: 'Grow', color: '#FFB000', description: 'Post-launch measurement and iteration that compound results long after release.' },
];

export function Process() {
  const reduced = useReducedMotion();

  return (
    <section id="process" className="relative w-full py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.04] blur-[170px]" />
      </div>

      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        <SectionHeading
          index="06"
          eyebrow="Process"
          description="A six-stage journey from raw idea to compounding growth — scroll to move through it."
          className="mb-16 lg:mb-20"
        >
          FROM IDEA
          <br />
          TO IMPACT.
        </SectionHeading>
      </div>

      <div className="hidden lg:block">
        <HorizontalProcess stages={stages} reduced={reduced} />
      </div>
      <div className="lg:hidden">
        <VerticalTimeline stages={stages} />
      </div>
    </section>
  );
}

function HorizontalProcess({ stages, reduced }: { stages: Stage[]; reduced: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  // motionValue so useTransform reacts when we imperatively set it
  const scrollDist = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (!rowRef.current || !viewRef.current) return;
      const dist = Math.max(0, rowRef.current.scrollWidth - viewRef.current.clientWidth);
      scrollDist.set(dist);
    };
    // measure after a short delay so layout has settled
    const id = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', measure);
    };
  }, [scrollDist]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // useTransform with a function reads scrollDist.get() each frame
  const x = useTransform(scrollYProgress, (p) =>
    reduced ? 0 : -(p * scrollDist.get())
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Each card is ~78vw wide + 32px gap.  6 cards need (6*cardW + 5*gap) px of track.
  // We provide 340vh which is more than enough and gives a comfortable scroll speed.

  return (
    <div ref={trackRef} className="relative h-[340vh]">
      <div
        ref={viewRef}
        className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden"
      >
        {/* progress bar */}
        <div className="mx-auto mb-10 w-[88%] max-w-[1480px]">
          <div className="relative h-px w-full bg-white/10">
            <motion.div
              style={{ width: progressWidth }}
              className="absolute left-0 top-0 h-px bg-gradient-to-r from-cyan via-violet to-gold"
            />
          </div>
        </div>

        <motion.div
          ref={rowRef}
          style={{ x }}
          className="flex gap-8 pl-[6vw] pr-[6vw]"
        >
          {stages.map((s) => (
            <article
              key={s.num}
              className="relative flex h-[420px] w-[min(78vw,640px)] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-800/50 p-10 backdrop-blur-sm"
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(60% 50% at 20% 10%, ${s.color}14, transparent)` }}
              />
              <div className="relative">
                <span className="font-mono text-sm" style={{ color: s.color }}>
                  {s.num}
                </span>
                <h3 className="mt-6 font-display text-5xl font-semibold tracking-tightest text-ivory lg:text-6xl">
                  {s.title}
                </h3>
              </div>
              <p className="relative max-w-md text-base leading-relaxed text-muted lg:text-lg">
                {s.description}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function VerticalTimeline({ stages }: { stages: Stage[] }) {
  return (
    <div className="relative mx-auto max-w-[1480px] px-6">
      <div className="absolute left-[27px] top-2 h-full w-px bg-gradient-to-b from-cyan/40 via-violet/30 to-gold/40" />
      <ul className="flex flex-col gap-12">
        {stages.map((s) => (
          <li key={s.num} className="relative flex gap-6">
            <div
              className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-navy-900"
              style={{ borderColor: `${s.color}55` }}
            >
              <span className="font-mono text-xs" style={{ color: s.color }}>
                {s.num}
              </span>
            </div>
            <div className="pt-2">
              <h3 className="font-display text-3xl font-semibold tracking-tight text-ivory">{s.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{s.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
