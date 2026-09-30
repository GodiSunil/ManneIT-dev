import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, projectAccentHex, type Project } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CursorContext } from '@/components/ui/CursorGlow';

export function Work() {
  return (
    <section id="work" className="relative w-full overflow-hidden py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-[55vh] w-[38vw] rounded-full bg-violet/[0.05] blur-[160px]" />
      </div>

      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        <SectionHeading
          index="03"
          eyebrow="Featured Work"
          description="A selection of projects across commerce, security, brand and AI — each built end-to-end with craft and engineering rigor."
          className="mb-16 lg:mb-24"
        >
          BUILT TO MAKE
          <br />
          AN IMPACT.
        </SectionHeading>

        <div className="flex flex-col gap-24 lg:gap-40">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const accent = projectAccentHex[project.accent];
  const cursorView = () => CursorContext.setMode('view', 'View');
  const cursorClear = () => CursorContext.clear();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.12, 1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]);

  const flip = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      {/* image */}
      <div className={flip ? 'lg:order-2' : ''}>
        <div
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06]"
          onMouseEnter={() => { setHovered(true); cursorView(); }}
          onMouseLeave={() => { setHovered(false); cursorClear(); }}
        >
          <motion.div style={{ scale }} className="aspect-[16/11] w-full">
            <img
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* gradient + accent lighting on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-500"
            animate={{ opacity: hovered ? 1 : 0 }}
            style={{ background: `radial-gradient(60% 60% at 50% 50%, ${accent}22, transparent)` }}
          />

          {/* oversized number */}
          <motion.span
            style={{ y }}
            className="absolute left-5 top-4 font-display text-7xl font-bold leading-none text-white/10 sm:text-8xl"
          >
            {project.number}
          </motion.span>

          {/* tags */}
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-navy-950/40 px-3 py-1.5 text-xs text-ivory/90 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* text */}
      <motion.div style={{ y: textY }} className={flip ? 'lg:order-1' : ''}>
        <span className="font-mono text-xs uppercase tracking-ultra" style={{ color: accent }}>
          Project {project.number}
        </span>
        <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ivory sm:text-4xl lg:text-5xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm uppercase tracking-wide text-muted">{project.category}</p>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{project.description}</p>
        <a
          href="#contact"
          className="group/link mt-7 inline-flex items-center gap-2 text-sm font-medium text-ivory"
        >
          View Case Study
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            style={{ color: accent }}
          />
        </a>
      </motion.div>
    </motion.div>
  );
}
