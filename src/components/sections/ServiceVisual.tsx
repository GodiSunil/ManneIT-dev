import { motion, AnimatePresence } from 'framer-motion';
import type { ServiceItem } from '@/data/services';
import { serviceColorHex } from '@/data/services';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  service: ServiceItem;
}

/** Renders a unique animated SVG motif for each service. */
export function ServiceVisual({ service }: Props) {
  const reduced = useReducedMotion();
  const color = serviceColorHex[service.color];

  return (
    <div className="relative h-full w-full">
      {/* color wash that changes per service */}
      <motion.div
        key={`wash-${service.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 60% at 70% 20%, ${color}1f, transparent 70%)`,
        }}
      />

      {/* oversized index watermark */}
      <span
        className="absolute right-6 top-2 font-display text-[200px] font-bold leading-none"
        style={{ color: `${color}0a` }}
      >
        {service.index}
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center p-8"
        >
          <Visual service={service} color={color} reduced={reduced} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Visual({
  service,
  color,
  reduced,
}: {
  service: ServiceItem;
  color: string;
  reduced: boolean;
}) {
  const id = service.id;
  const animate = !reduced;

  switch (service.visual) {
    case 'growth':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          {[40, 80, 120, 160, 200, 240].map((y, i) => (
            <line key={y} x1="20" y1={y} x2="280" y2={y} stroke="#ffffff" strokeOpacity="0.05" />
          ))}
          <motion.path
            d="M20 210 C 70 190, 90 150, 130 130 S 200 80, 280 40"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            initial={animate ? { pathLength: 0 } : undefined}
            animate={animate ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {[ [60, 192], [120, 132], [200, 78], [280, 40] ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill={color}
              initial={animate ? { opacity: 0, scale: 0 } : undefined}
              animate={animate ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 0.3 + i * 0.15 }}
            />
          ))}
          {animate && (
            <motion.circle
              cx="280" cy="40" r="10" fill="none" stroke={color}
              animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </svg>
      );

    case 'composition':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          {animate && (
            <motion.rect
              x="40" y="40" width="120" height="120" rx="8"
              fill="none" stroke={color} strokeWidth="1.5"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '100px 100px' }}
            />
          )}
          <motion.circle
            cx="200" cy="120" r="60" fill="none" stroke="#8B5CF6" strokeWidth="1.5"
            initial={animate ? { pathLength: 0 } : undefined}
            animate={animate ? { pathLength: 1 } : undefined}
            transition={{ duration: 1 }}
          />
          <motion.rect
            x="120" y="120" width="100" height="100" rx="10"
            fill={`${color}14`} stroke={color} strokeWidth="1"
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.3 }}
          />
          <circle cx="150" cy="90" r="5" fill="#FFB000" />
        </svg>
      );

    case 'layers':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          {[
            { y: 60, o: 0.25, d: 0 },
            { y: 100, o: 0.4, d: 0.1 },
            { y: 140, o: 0.6, d: 0.2 },
            { y: 180, o: 0.9, d: 0.3 },
          ].map((l, i) => (
            <motion.rect
              key={i}
              x="50" y={l.y} width="200" height="36" rx="6"
              fill={`${color}22`} stroke={`${color}55`}
              initial={animate ? { opacity: 0, x: -30 } : undefined}
              animate={animate ? { opacity: l.o, x: 0 } : undefined}
              transition={{ delay: l.d, duration: 0.6 }}
            />
          ))}
          <motion.line
            x1="80" y1="78" x2="220" y2="78" stroke="#ffffff" strokeOpacity="0.2"
            initial={animate ? { pathLength: 0 } : undefined}
            animate={animate ? { pathLength: 1 } : undefined}
            transition={{ delay: 0.4 }}
          />
          <circle cx="80" cy="158" r="3" fill={color} />
        </svg>
      );

    case 'architecture':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          <g stroke={color} strokeWidth="1.4" fill="none" opacity="0.8">
            <motion.path
              d="M60 200 L60 80 L150 40 L240 80 L240 200"
              initial={animate ? { pathLength: 0 } : undefined}
              animate={animate ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.1 }}
            />
            <line x1="60" y1="120" x2="240" y2="120" opacity="0.4" />
            <line x1="60" y1="160" x2="240" y2="160" opacity="0.3" />
            <line x1="150" y1="40" x2="150" y2="200" opacity="0.3" />
          </g>
          {[ [60,80], [240,80], [150,40], [150,120], [150,160] ].map(([cx, cy], i) => (
            <motion.circle
              key={i} cx={cx} cy={cy} r="4" fill={color}
              initial={animate ? { scale: 0 } : undefined}
              animate={animate ? { scale: 1 } : undefined}
              transition={{ delay: 0.4 + i * 0.1 }}
            />
          ))}
        </svg>
      );

    case 'mobile':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          <motion.rect
            x="110" y="30" width="80" height="170" rx="14"
            fill="none" stroke={color} strokeWidth="1.6"
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
          />
          <line x1="110" y1="55" x2="190" y2="55" stroke={color} strokeOpacity="0.4" />
          <line x1="110" y1="180" x2="190" y2="180" stroke={color} strokeOpacity="0.4" />
          {[70, 90, 110, 130, 150].map((y, i) => (
            <motion.rect
              key={y} x="122" y={y} width="56" height="8" rx="3"
              fill={`${color}33`}
              initial={animate ? { opacity: 0, x: -10 } : undefined}
              animate={animate ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.2 + i * 0.08 }}
            />
          ))}
          <circle cx="150" cy="192" r="4" fill={color} />
        </svg>
      );

    case 'nodes':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          <g stroke={`${color}66`} strokeWidth="1.2" fill="none">
            <line x1="150" y1="120" x2="60" y2="60" />
            <line x1="150" y1="120" x2="240" y2="60" />
            <line x1="150" y1="120" x2="60" y2="190" />
            <line x1="150" y1="120" x2="240" y2="190" />
            <line x1="60" y1="60" x2="240" y2="60" opacity="0.3" />
            <line x1="60" y1="190" x2="240" y2="190" opacity="0.3" />
          </g>
          <motion.circle
            cx="150" cy="120" r="14" fill={`${color}22`} stroke={color}
            animate={animate ? { scale: [1, 1.15, 1] } : undefined}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {[ [60,60], [240,60], [60,190], [240,190] ].map(([cx, cy], i) => (
            <motion.circle
              key={i} cx={cx} cy={cy} r="7" fill={color}
              initial={animate ? { scale: 0 } : undefined}
              animate={animate ? { scale: 1 } : undefined}
              transition={{ delay: 0.2 + i * 0.1 }}
            />
          ))}
        </svg>
      );

    case 'neural':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          <g stroke="#8B5CF666" strokeWidth="1">
            {[0, 1, 2, 3].map((l) =>
              [0, 1, 2].map((r) => (
                <line key={`${l}-${r}`} x1={60 + l * 60} y1={50 + l * 10} x2={150 + r * 30} y2={120 + r * 10} opacity="0.4" />
              ))
            )}
            {[0, 1, 2].map((m) =>
              [0, 1].map((o) => (
                <line key={`m-${m}-${o}`} x1={150 + m * 30} y1={120 + m * 10} x2={250} y2={90 + o * 60} opacity="0.4" />
              ))
            )}
          </g>
          {[
            [60, 50], [120, 60], [180, 70], [240, 80],
            [150, 120], [180, 130], [210, 140],
            [250, 90], [250, 150],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i} cx={cx} cy={cy} r="5" fill={i % 3 === 0 ? color : '#8B5CF6'}
              animate={animate ? { opacity: [0.4, 1, 0.4] } : undefined}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </svg>
      );

    case 'shield':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          <motion.path
            d="M150 30 L230 60 L230 130 C230 175, 190 205, 150 215 C110 205, 70 175, 70 130 L70 60 Z"
            fill={`${color}10`} stroke={color} strokeWidth="1.8"
            initial={animate ? { pathLength: 0 } : undefined}
            animate={animate ? { pathLength: 1 } : undefined}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M115 125 L140 150 L190 95"
            fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={animate ? { pathLength: 0 } : undefined}
            animate={animate ? { pathLength: 1 } : undefined}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
          {[ [70,60], [230,60], [70,130], [230,130] ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill={`${color}88`} />
          ))}
        </svg>
      );

    case 'timeline':
      return (
        <svg viewBox="0 0 300 240" className="h-full w-full max-w-md">
          <line x1="30" y1="120" x2="270" y2="120" stroke={`${color}44`} strokeWidth="1.5" />
          {[
            { x: 60, h: 50, d: 0 },
            { x: 110, h: 80, d: 0.1 },
            { x: 160, h: 40, d: 0.2 },
            { x: 210, h: 90, d: 0.3 },
            { x: 260, h: 60, d: 0.4 },
          ].map((f, i) => (
            <g key={i}>
              <motion.rect
                x={f.x - 18} y={120 - f.h} width="36" height={f.h}
                fill={`${color}22`} stroke={`${color}55`}
                initial={animate ? { opacity: 0, scaleY: 0 } : undefined}
                animate={animate ? { opacity: 1, scaleY: 1 } : undefined}
                transition={{ delay: f.d, duration: 0.5 }}
                style={{ transformOrigin: `${f.x}px 120px` }}
              />
              <circle cx={f.x} cy="120" r="4" fill={color} />
            </g>
          ))}
          {animate && (
            <motion.line
              x1="30" y1="120" x2="30" y2="120" stroke="#FFB000" strokeWidth="2"
              animate={{ x2: [30, 270] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </svg>
      );

    default:
      return null;
  }
}
