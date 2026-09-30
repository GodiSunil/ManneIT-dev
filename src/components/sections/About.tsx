import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // layered parallax
  const y1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [90, -90]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30]);

  // focus opacity for the statement words
  const focus1 = useTransform(scrollYProgress, [0, 0.35, 0.6, 1], [0.25, 1, 1, 0.3]);
  const focus2 = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0.25, 1, 1, 0.3]);

  return (
    <section ref={ref} id="about" className="relative w-full overflow-hidden py-28 lg:py-44">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 h-[55vh] w-[42vw] -translate-y-1/2 rounded-full bg-violet/[0.05] blur-[170px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[40vh] w-[30vw] rounded-full bg-cyan/[0.04] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        <SectionHeading index="04" eyebrow="About" className="mb-16 lg:mb-28">
          WHO WE ARE.
        </SectionHeading>

        {/* Signature statement with focus animation */}
        <div className="relative">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ivory sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px]">
            <motion.span style={{ opacity: reduced ? 1 : focus1 }} className="block">
              TECHNOLOGY IS OUR TOOL.
            </motion.span>
            <motion.span
              style={{ opacity: reduced ? 1 : focus2 }}
              className="block bg-gradient-to-r from-cyan via-cyan-bright to-violet bg-clip-text text-transparent"
            >
              IDEAS ARE OUR FUEL.
            </motion.span>
          </h2>
        </div>

        {/* Layered floating typographic concepts */}
        <div className="relative mt-24 lg:mt-36">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
                We are a creative technology company operating at the intersection of
                three disciplines. They aren't separate departments — they're layered
                into a single way of building.
              </p>
            </Reveal>

            <div className="relative h-[360px] sm:h-[420px] lg:h-[480px]">
              <Layer label="TECHNOLOGY" y={y1} className="left-0 top-0 text-ivory/20 z-10" reduced={reduced} />
              <Layer label="CREATIVITY" y={y2} className="left-12 top-24 text-violet/40 z-20 sm:left-20 sm:top-28 lg:left-28" reduced={reduced} />
              <Layer label="STRATEGY" y={y3} className="left-24 top-48 text-ivory z-30 sm:left-36 sm:top-56 lg:left-52" reduced={reduced} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Layer({
  label,
  y,
  className,
  reduced,
}: {
  label: string;
  y: MotionValue<number>;
  className: string;
  reduced: boolean;
}) {
  return (
    <motion.h3
      style={{ y: reduced ? 0 : y }}
      className={`absolute font-display text-5xl font-bold tracking-tightest sm:text-7xl lg:text-8xl ${className}`}
    >
      {label}
    </motion.h3>
  );
}
