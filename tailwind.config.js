/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030712',
          900: '#050816',
          800: '#070B14',
          700: '#0A1020',
          600: '#0E1526',
        },
        ivory: '#F5F7FA',
        muted: '#9CA3AF',
        cyan: {
          DEFAULT: '#18D9FF',
          deep: '#009DFF',
          bright: '#00BFFF',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          deep: '#6D28D9',
          magenta: '#C026D3',
        },
        gold: {
          DEFAULT: '#FFB000',
          orange: '#FF8A00',
          soft: '#FFC107',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        sans: ['"Satoshi"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
        ultra: '0.3em',
      },
      animation: {
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'drift': 'drift 16s ease-in-out infinite',
        'sweep': 'sweep 7s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'orbit': 'orbit 40s linear infinite',
        'orbit-rev': 'orbitRev 55s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-16px,0)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(26px,-18px,0) scale(1.04)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.3' },
          '50%': { opacity: '0.65' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbitRev: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
