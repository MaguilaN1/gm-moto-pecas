/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48', // Primary Red
          700: '#be123c', // Hover Red
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        dark: {
          950: '#070a0f',
          900: '#0b0f17', // Main Dark Background
          850: '#111827', // Secondary Dark
          800: '#182234', // Card Background
          700: '#26354a', // Border & Hover
          600: '#3d4f68',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(225, 29, 72, 0.4)',
        'glow-lg': '0 0 30px -5px rgba(225, 29, 72, 0.6)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 4px 25px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
