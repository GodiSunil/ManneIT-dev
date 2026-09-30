import { useRef, useState, type FormEvent } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle, Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const services = [
  'Web Design & Development',
  'Brand Identity',
  'UI/UX Design',
  'Mobile App Development',
  'AI & Automation',
  'E-commerce',
  'Digital Strategy',
  'SEO & Growth',
  'Other',
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50]);

  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Please tell us about your project.';
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    // Simulate async submission delay, then open mailto as fallback
    await new Promise((r) => setTimeout(r, 900));

    const subject = encodeURIComponent(`New enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service || 'Not specified'}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:hello@manneitsolutions.com?subject=${subject}&body=${body}`;

    setStatus('sent');
  };

  const field = (
    id: keyof typeof form,
    label: string,
    type = 'text',
    placeholder = ''
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-ultra text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={form[id]}
        onChange={(e) => { setForm((p) => ({ ...p, [id]: e.target.value })); setErrors((p) => ({ ...p, [id]: undefined })); }}
        className={`w-full rounded-xl border bg-white/[0.03] px-5 py-3.5 text-sm text-ivory placeholder-white/20 outline-none transition-all duration-200 focus:bg-white/[0.05] focus:ring-1 ${errors[id] ? 'border-red-500/60 focus:ring-red-500/40' : 'border-white/10 focus:border-cyan/50 focus:ring-cyan/20'}`}
      />
      {errors[id] && <p className="text-xs text-red-400">{errors[id]}</p>}
    </div>
  );

  return (
    <section ref={ref} id="contact" className="relative w-full overflow-hidden py-28 lg:py-40">
      {/* atmospheric lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[85vh] w-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.07] blur-[190px]" />
        <div className="absolute right-1/4 top-1/4 h-[42vh] w-[42vh] rounded-full bg-violet/[0.07] blur-[150px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[30vh] w-[30vh] rounded-full bg-gold/[0.04] blur-[140px]" />
      </div>

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10] mask-radial"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        {/* headline */}
        <div className="mb-16 text-center lg:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-ultra text-cyan"
          >
            Let's Begin
          </motion.span>

          <motion.h2
            style={{ y }}
            className="mt-6 font-display text-[11vw] font-semibold leading-[0.88] tracking-tightest text-ivory sm:text-[8vw] lg:text-[7vw] xl:text-[100px]"
          >
            LET'S BUILD
            <br />
            <span className="bg-gradient-to-r from-cyan via-cyan-bright to-violet bg-clip-text text-transparent">
              WHAT'S NEXT.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Tell us what you're building. We'll bring the technology, creativity and
            strategy to take it from idea to impact.
          </motion.p>
        </div>

        {/* form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-2xl"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan/20 via-violet/10 to-transparent" />
          <div className="relative rounded-3xl border border-white/[0.06] bg-navy-900/80 p-8 backdrop-blur-xl sm:p-12">

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-5 py-12 text-center"
                >
                  <CheckCircle className="h-14 w-14 text-cyan" strokeWidth={1.5} />
                  <h3 className="font-display text-3xl font-semibold text-ivory">Message sent!</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-muted">
                    Your email client should have opened with the details pre-filled. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', service: '', message: '' }); }}
                    className="mt-4 font-mono text-xs uppercase tracking-ultra text-cyan underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    {field('name', 'Your name', 'text', 'Jane Smith')}
                    {field('email', 'Email address', 'email', 'jane@company.com')}
                  </div>

                  {/* service select */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="font-mono text-xs uppercase tracking-ultra text-muted">
                      Service needed <span className="normal-case opacity-50">(optional)</span>
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm text-ivory outline-none transition-all duration-200 focus:border-cyan/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-cyan/20 [&>option]:bg-navy-900"
                    >
                      <option value="">Select a service…</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-mono text-xs uppercase tracking-ultra text-muted">
                      Tell us about your project
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Brief description, timeline, budget range…"
                      value={form.message}
                      onChange={(e) => { setForm((p) => ({ ...p, message: e.target.value })); setErrors((p) => ({ ...p, message: undefined })); }}
                      className={`w-full resize-none rounded-xl border bg-white/[0.03] px-5 py-3.5 text-sm text-ivory placeholder-white/20 outline-none transition-all duration-200 focus:bg-white/[0.05] focus:ring-1 ${errors.message ? 'border-red-500/60 focus:ring-red-500/40' : 'border-white/10 focus:border-cyan/50 focus:ring-cyan/20'}`}
                    />
                    {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <a
                      href="mailto:hello@manneitsolutions.com"
                      className="hidden items-center gap-1.5 text-xs text-muted transition-colors hover:text-ivory sm:flex"
                    >
                      hello@manneitsolutions.com
                      <ArrowUpRight className="h-3 w-3 text-cyan" />
                    </a>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="ml-auto inline-flex items-center gap-2.5 rounded-full bg-cyan px-7 py-3.5 text-sm font-medium text-navy-950 transition-all duration-300 hover:bg-cyan-bright disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Start a Conversation
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
