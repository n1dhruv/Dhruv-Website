/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['"Space Mono"', 'monospace'],
        'display': ['Syne', 'sans-serif'],
      },
      colors: {
        // Minimalist dark palette
        'ink': '#000000',           // true background
        'surface': '#000000',       // card/panel surface
        'surface-2': '#050505',     // elevated surface
        'line': 'rgba(255,255,255,0.07)', // subtle border
        'line-strong': 'rgba(255,255,255,0.14)',
        // Accent family from #110852
        'navy': '#110852',          // primary accent fill
        'navy-mid': '#1d0e82',      // mid accent
        'navy-glow': 'rgba(17,8,82,0.25)', // glow/shadow
        'lilac': '#8b7cf8',         // lighter variant for text/icons
        // Text
        'snow': '#f2f2f4',          // primary text
        'mist': '#9094a4',          // secondary text
        'dim': '#4b4f60',           // muted text
        // Legacy retro aliases (for KeyboardNavigation compatibility)
        retro: {
          bg: 'var(--bg-color)',
          surface: 'var(--surface)',
          accent: 'var(--accent-retro)',
          text: 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          border: 'var(--border-color)',
        }
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, rgba(139,124,248,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot': '28px 28px',
      },
      boxShadow: {
        'navy-glow': '0 0 30px rgba(17,8,82,0.35)',
        'card': '0 1px 0 rgba(255,255,255,0.04)',
        'retro': 'var(--retro-shadow)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
