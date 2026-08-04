import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Wipe all defaults and replace with the design system
    colors: {
      obsidian:   '#0B0B0A',
      slate:      '#3A3D3E',
      timber:     '#8C6239',
      travertine: '#B9AE9A',
      hedge:      '#232A20',
      ember:      '#D89448',
      'ember-bright': '#E0A058',
      pool:       '#2C6E68',
      transparent: 'transparent',
      current:    'currentColor',
      white:      '#FFFFFF',
      black:      '#000000',
    },
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      sm:   '4px',
      none: '0px',
      full: '9999px',
    },
    extend: {
      spacing: {
        section: 'clamp(64px, 8vw, 120px)',
      },
      fontSize: {
        'fluid-xl': ['clamp(2.4rem, 6vw, 5.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'fluid-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'fluid-lg': ['clamp(1.5rem, 3.5vw, 2.8rem)', { lineHeight: '1.18' }],
        'fluid-md': ['clamp(1rem, 2vw, 1.25rem)', { lineHeight: '1.6' }],
      },
      maxWidth: {
        content: '1600px',
        prose: '540px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-custom': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'draw-underline': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
      },
      animation: {
        'draw-underline': 'draw-underline 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
