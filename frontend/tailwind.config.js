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
        'sans': ['"Space Mono"', 'monospace'],
        'mono': ['"Space Mono"', 'monospace'],
        'heading': ['Syne', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        // Retro theme colors
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
        'retro-grid': 'radial-gradient(circle, rgb(51, 51, 51) 1px, transparent 1px)',
      },
      boxShadow: {
        'retro': 'var(--retro-shadow)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        marquee2: 'marquee2 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
       }
      }
    },
  },
  plugins: [],
}
