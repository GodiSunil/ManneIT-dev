import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import { services, serviceColorHex } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceVisual } from './ServiceVisual';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CursorContext } from '@/components/ui/CursorGlow';

export function Services() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const current = services[active];
  const cursorExplore = () => CursorContext.setMode('explore', 'Explore');
  const cursorClear = () => CursorContext.clear();

  // Scroll-driven active index for desktop sticky experience
  useEffect(() => {
    if (!sectionRef.current) return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progressed = Math.min(Math.max(-rect.top, 0), total);
      const ratio = total > 0 ? progressed / total : 0;
      const idx = Math.min(Math.floor(ratio * services.length), services.length - 1);
      setActive(idx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative w-full">
      {/* ambient lighting that shifts with active service color */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ backgroundColor: `${serviceColorHex[current.color]}08` }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        />
        <motion.div
          key={`glow-${current.id}`}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute left-1/4 top-1/3 h-[55vh] w-[45vw] rounded-full blur-[160px]"
          style={{ backgroundColor: `${serviceColorHex[current.color]}14` }}
        />
      </div>

      {/* Heading block (scrolls normally) */}
      <div className="mx-auto max-w-[1480px] px-6 pt-28 lg:px-10 lg:pt-40">
        <SectionHeading
          index="01"
          eyebrow="What We Do"
          description="Nine disciplines under one roof — covering the full arc from first idea to launched product and beyond. Scroll to move through them."
          className="mb-16 lg:mb-24"
        >
          EVERYTHING YOU NEED
          <br />
          TO BUILD DIGITAL.
        </SectionHeading>
      </div>

      {/* ---------- Desktop: sticky scroll experience ---------- */}
      <div className="hidden lg:block">
        {/* spacer drives the scroll length */}
        <div style={{ height: `${services.length * 70}vh` }} className="relative">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1480px] grid-cols-[1fr_1fr] gap-12 px-10">
              {/* left: service names */}
              <div className="flex flex-col justify-center">
                <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {services.map((s, i) => {
                    const isActive = i === active;
                    const hex = serviceColorHex[s.color];
                    return (
                      <li key={s.id}>
                        <button
                          onMouseEnter={() => { setActive(i); cursorExplore(); }}
                          onMouseLeave={cursorClear}
                          className="group flex w-full items-center gap-6 py-4 text-left transition-all duration-500"
                        >
                          <span
                            className="font-mono text-xs transition-colors duration-500"
                            style={{ color: isActive ? hex : 'rgba(156,163,175,0.4)' }}
                          >
                            {s.index}
                          </span>
                          <span
                            className="flex-1 font-display text-2xl font-medium tracking-tight transition-all duration-500 xl:text-3xl"
                            style={{
                              color: isActive ? '#F5F7FA' : 'rgba(156,163,175,0.55)',
                              transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                            }}
                          >
                            {s.title}
                          </span>
                          <ArrowUpRight
                            className="h-5 w-5 transition-all duration-500"
                            style={{
                              color: hex,
                              transform: isActive ? 'rotate(0deg)' : 'rotate(-45deg)',
                              opacity: isActive ? 1 : 0,
                            }}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* active service detail */}
                <div className="mt-8 h-[120px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span
                        className="font-mono text-xs uppercase tracking-ultra"
                        style={{ color: serviceColorHex[current.color] }}
                      >
                        {current.tagline}
                      </span>
                      <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                        {current.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {current.capabilities.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-ivory/80"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* right: sticky visual panel */}
              <div className="relative h-[560px] overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-800/50 backdrop-blur-sm">
                <ServiceVisual service={current} />
                {/* progress rail */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-ultra text-muted">
                    {String(active + 1).padStart(2, '0')} / 09
                  </span>
                  <div className="relative h-px flex-1 bg-white/10">
                    <motion.div
                      className="absolute left-0 top-0 h-px"
                      animate={{ width: `${((active + 1) / services.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ backgroundColor: serviceColorHex[current.color] }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile: stacked accordion ---------- */}
      <div className="px-6 pb-28 lg:hidden">
        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {services.map((s, i) => {
            const isOpen = i === active;
            const hex = serviceColorHex[s.color];
            return (
              <li key={s.id}>
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-xs" style={{ color: isOpen ? hex : 'rgba(156,163,175,0.5)' }}>
                    {s.index}
                  </span>
                  <span
                    className="flex-1 font-display text-2xl font-medium tracking-tight"
                    style={{ color: isOpen ? '#F5F7FA' : '#9CA3AF' }}
                  >
                    {s.title}
                  </span>
                  <Plus
                    className="h-5 w-5 transition-transform duration-500"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none', color: isOpen ? hex : '#9CA3AF' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="relative mb-4 h-48 overflow-hidden rounded-xl border border-white/[0.06] bg-navy-800/50">
                        <ServiceVisual service={s} />
                      </div>
                      <div className="pb-6 pl-10">
                        <span className="font-mono text-xs uppercase tracking-ultra" style={{ color: hex }}>
                          {s.tagline}
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {s.capabilities.map((c) => (
                            <span key={c} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-ivory/80">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
