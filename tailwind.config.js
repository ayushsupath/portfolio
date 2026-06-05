/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', 'sans-serif'],
      },
      colors: {
        lime: {
          neon: '#00FF41',
        },
        dark: {
          bg: '#050505',
          purple: '#0B0216',
        }
      },
      fontSize: {
        massive: '12vw',
        display: '10vw',
      },
      letterSpacing: {
        tighter: '-0.05em',
        widest: '0.2em',
      }
    },
  },
  plugins: [],
};
