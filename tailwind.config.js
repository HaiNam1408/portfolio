/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  // Hover states only for a fine pointer; touch screens never get sticky hovers.
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        display: ['"Noto Serif Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: token('paper'),
        raised: token('paper-raised'),
        rose: token('rose'),
        sage: token('sage'),
        mist: token('mist'),
        ink: token('ink'),
        'ink-soft': token('ink-soft'),
        rule: token('rule'),
        burgundy: token('burgundy'),
        'burgundy-deep': token('burgundy-deep'),
        gold: token('gold'),
        'on-burgundy': token('on-burgundy'),
        'stamp-red': token('stamp-red'),
        'stamp-navy': token('stamp-navy'),
        'stamp-green': token('stamp-green'),
        'stamp-plum': token('stamp-plum'),
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
