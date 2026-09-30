import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/ui/Magnetic';
import { CursorContext } from '@/components/ui/CursorGlow';

const sections = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const sectionIds = sections.map((s) => s.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 lg:pt-6"
      >
        <nav
          className={`flex items-center justify-between gap-6 rounded-full border transition-all duration-500 ${
            scrolled
              ? 'border-white/[0.08] bg-navy-900/70 py-2.5 pl-6 pr-3 backdrop-blur-xl lg:gap-10'
              : 'border-white/[0.04] bg-navy-900/30 py-3 pl-6 pr-3 backdrop-blur-md lg:gap-10'
          }`}
          style={{ width: 'min(100%, 1180px)' }}
        >
          {/* Brand */}
          <a href="#home" className="group flex items-center gap-2.5" aria-label="Manne IT Solutions home">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan to-violet opacity-90 transition-transform duration-500 group-hover:scale-110" />
              <span className="relative font-display text-sm font-bold text-navy-950">M</span>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight text-ivory">Manne IT</span>
              <span className="font-mono text-[9px] uppercase tracking-ultra text-muted">Solutions</span>
            </span>
          </a>

          {/* Desktop nav with active indicator */}
          <ul className="hidden items-center lg:flex">
            {sections.map((l) => {
              const id = l.href.slice(1);
              const isActive = active === id;
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    className={`relative px-4 py-2 text-sm transition-colors duration-300 ${
                      isActive ? 'text-ivory' : 'text-muted hover:text-ivory'
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-cyan to-violet"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.2} className="hidden lg:block">
              <a
                href="#contact"
                onMouseEnter={() => CursorContext.setMode('link', 'Talk')}
                onMouseLeave={() => CursorContext.clear()}
                className="group inline-flex items-center gap-1.5 rounded-full bg-ivory px-5 py-2.5 text-sm font-medium text-navy-950 transition-all duration-300 hover:bg-cyan"
              >
                Let's Talk
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ivory transition-colors hover:border-cyan/50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>{open && <MobileNav sections={sections} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function MobileNav({ sections, onClose }: { sections: { label: string; href: string }[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] bg-navy-950/96 backdrop-blur-2xl lg:hidden"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet/15 blur-[130px]" />

      <div className="relative flex items-center justify-between px-6 py-5">
        <span className="font-display text-sm font-semibold text-ivory">Manne IT</span>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ivory"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <motion.ul
        className="flex flex-col gap-1 px-6 pt-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
      >
        {sections.map((l, i) => (
          <motion.li
            key={l.href}
            variants={{
              hidden: { opacity: 0, y: 26 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="border-b border-white/[0.06]"
          >
            <a href={l.href} onClick={onClose} className="flex items-baseline justify-between py-5">
              <span className="font-display text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
                {l.label}
              </span>
              <span className="font-mono text-xs text-cyan">0{i + 1}</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="px-6 pt-10"
      >
        <a
          href="#contact"
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-4 text-sm font-medium text-navy-950"
        >
          Start a Conversation
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
    </motion.div>
  );
}
