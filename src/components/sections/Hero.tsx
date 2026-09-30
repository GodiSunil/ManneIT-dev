import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PrimaryButton, GhostButton } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { pos, tick } = useMousePosition();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // cinematic exit: layers separate and fade as you scroll out
  const yText = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // mouse parallax (normalized -0.5..0.5)
  const mx = typeof window !== 'undefined' ? pos.current.x / window.innerWidth - 0.5 : 0;
  const my = typeof window !== 'undefined' ? pos.current.y / window.innerHeight - 0.5 : 0;
  void tick;

  const words = [
    { t: 'WE', a: false },
    { t: 'TURN', a: false },
    { t: 'IDEAS', a: true },
    { t: 'INTO', a: false },
    { t: 'DIGITAL', a: false },
    { t: 'EXPERIENCES.', a: true },
  ];

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* ---------- Background field ---------- */}
      <motion.div style={{ y: reduced ? 0 : yBg, scale: reduced ? 1 : scale }} className="absolute inset-0 -z-10">
        {/* deep navy radial base */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#0A1020_0%,#030712_65%)]" />

        {/* thin grid with radial mask */}
        <div
          className="absolute inset-0 opacity-[0.14] mask-radial"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* ambient cyan light field */}
        <div
          className="absolute left-1/2 top-1/3 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.12] blur-[150px]"
          style={{ transform: reduced ? 'translate(-50%,-50%)' : `translate(calc(-50% + ${mx * 34}px), calc(-50% + ${my * 30}px))` }}
        />
        {/* violet light field */}
        <div
          className="absolute right-[12%] top-[18%] h-[42vh] w-[42vh] rounded-full bg-violet/[0.10] blur-[140px]"
          style={{ transform: reduced ? 'none' : `translate(${mx * -42}px, ${my * -22}px)` }}
        />
        {/* gold micro light — sparingly */}
        <div className="absolute left-[8%] bottom-[16%] h-[20vh] w-[20vh] rounded-full bg-gold/[0.05] blur-[110px]" />

        {/* light trail sweep */}
        {!reduced && (
          <div className="absolute left-0 top-[58%] h-px w-full overflow-hidden opacity-30">
            <div className="h-px w-1/3 animate-sweep bg-gradient-to-r from-transparent via-cyan to-transparent" />
          </div>
        )}

        {/* bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-navy-950" />
      </motion.div>

      {/* ---------- Abstract M-structure (right) ---------- */}
      <motion.div
        style={{ y: reduced ? 0 : yVisual, opacity }}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden h-full w-1/2 lg:block"
      >
        <MStructure mx={mx} my={my} reduced={reduced} />
      </motion.div>

      {/* ---------- Content ---------- */}
      <motion.div
        style={{ y: reduced ? 0 : yText, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-center px-6 pt-28 pb-24 lg:px-10"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-xs uppercase tracking-ultra text-muted">
            Creative Technology Studio
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="font-display text-[14vw] font-semibold leading-[0.88] tracking-tightest text-ivory sm:text-[12vw] md:text-[9.5vw] lg:text-[7.6vw] xl:text-[116px]">
          {words.map((w, i) => (
            <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-bottom">
              <motion.span
                className={`inline-block ${w.a ? 'bg-gradient-to-br from-cyan via-cyan-bright to-violet bg-clip-text text-transparent' : ''}`}
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {w.t}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* supporting + CTAs */}
        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            We combine technology, creativity and strategy to build modern digital
            experiences that help ambitious businesses move forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-wrap items-center gap-4"
          >
            <PrimaryButton href="#services">Explore Our Services</PrimaryButton>
            <GhostButton href="#contact">Let's Work Together</GhostButton>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------- Scroll indicator ---------- */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-ultra text-muted">Scroll to Explore</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-cyan to-transparent"
            animate={{ y: [-20, 48] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}

/** Abstract futuristic interpretation of the Manne "M" — geometric architecture. */
function MStructure({ mx, my, reduced }: { mx: number; my: number; reduced: boolean }) {
  return (
    <div className="relative h-full w-full">
      {/* concentric rings */}
      <div className="absolute right-[8%] top-1/2 h-[60vh] w-[60vh] -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-cyan/15" />
        <div className="absolute inset-[12%] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[26%] rounded-full border border-violet/15" />
        {!reduced && (
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-cyan/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* M geometry — connected line architecture */}
      <svg
        viewBox="0 0 400 400"
        className="absolute right-[8%] top-1/2 h-[52vh] w-[52vh] -translate-y-1/2"
        style={{ transform: reduced ? 'translateY(-50%)' : `translate(${mx * -26}px, calc(-50% + ${my * 22}px))` }}
        aria-hidden
      >
        <defs>
          <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#18D9FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <g stroke="url(#mg)" strokeWidth="1.5" fill="none" opacity="0.85">
          <path d="M80 320 L80 90 L200 230 L320 90 L320 320" />
          <path d="M80 90 L200 230" opacity="0.5" />
          <path d="M320 90 L200 230" opacity="0.5" />
          <path d="M80 320 L200 230 L320 320" opacity="0.4" />
        </g>
        {/* nodes */}
        <g fill="#18D9FF">
          <circle cx="80" cy="90" r="4" />
          <circle cx="320" cy="90" r="4" />
          <circle cx="200" cy="230" r="5" fill="#8B5CF6" />
          <circle cx="80" cy="320" r="3" fill="#FFB000" />
          <circle cx="320" cy="320" r="3" fill="#FFB000" />
        </g>
      </svg>

      {/* floating accents */}
      {!reduced && (
        <>
          <motion.div
            className="absolute right-[24%] top-[26%] h-24 w-24 rounded-full border border-cyan/20"
            animate={{ y: [0, -18, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transform: `translate(${mx * 18}px, ${my * 14}px)` }}
          />
          <motion.div
            className="absolute right-[16%] bottom-[22%] h-3 w-3 rounded-full bg-violet"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </>
      )}
    </div>
  );
}
