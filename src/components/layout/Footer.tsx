const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  { label: 'Digital Marketing', href: '#services' },
  { label: 'Graphic Design', href: '#services' },
  { label: 'UI/UX', href: '#services' },
  { label: 'Web Development', href: '#services' },
  { label: 'Mobile Development', href: '#services' },
  { label: 'AI & ML', href: '#services' },
  { label: 'Cybersecurity', href: '#services' },
  { label: 'Video Editing', href: '#services' },
];

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.06] bg-navy-950">
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[80vw] -translate-x-1/2 rounded-full bg-cyan/[0.04] blur-[130px]" />

      {/* oversized brand watermark */}
      <div className="overflow-hidden px-6 pt-20 lg:px-10">
        <h2 className="font-display text-[18vw] font-bold leading-none tracking-tightest text-white/[0.025] lg:text-[200px]">
          MANNE IT
        </h2>
      </div>

      <div className="relative mx-auto max-w-[1480px] px-6 pb-12 lg:px-10">
        <div className="grid gap-12 border-t border-white/[0.06] py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-cyan to-violet">
                <span className="font-display text-sm font-bold text-navy-950">M</span>
              </span>
              <span className="font-display text-sm font-semibold text-ivory">Manne IT</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Manne IT Solutions Private Limited — a creative technology &amp; digital
              solutions company building modern digital experiences.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-ultra text-muted/70">Navigation</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-ivory">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-ultra text-muted/70">Services</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-ivory">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-ultra text-muted/70">Contact</h3>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href="mailto:hello@manneitsolutions.com" className="text-sm text-muted transition-colors hover:text-ivory">
                  hello@manneitsolutions.com
                </a>
              </li>
              <li className="text-sm text-muted">India</li>
            </ul>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan" />
              <span className="font-mono text-[10px] uppercase tracking-ultra text-muted">
                Available for new projects
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.06] py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Manne IT Solutions Private Limited. All rights reserved.
          </p>
          <a href="#home" className="text-xs text-muted transition-colors hover:text-ivory">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
