/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ReTRRAC logo palette – blues from the three logo dots
        brand: {
          50: '#eef7ff',
          100: '#d9edfe',
          200: '#b5dcfc',
          300: '#83c5fa',
          400: '#47acf7',
          500: '#1f9ff6', // logo sky blue (light dot)
          600: '#1f82df', // logo mid blue
          700: '#1f6acb', // logo royal blue (dark dot)
          800: '#1c5099',
          900: '#183f74',
          950: '#0f2647',
        },
        // ReTRRAC logo orange – "TRAINING & CONSULTING"
        accent: {
          50: '#fef6f0',
          100: '#fce8da',
          200: '#f8cdb0',
          300: '#f1a97c',
          400: '#e5824c',
          500: '#d76c37',
          600: '#c65e2c', // logo orange
          700: '#a44a23',
          800: '#843d22',
          900: '#6c341f',
        },
        // ReTRRAC logo wordmark navy
        ink: {
          DEFAULT: '#151826',
          soft: '#2a3045',
        },
        electric: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #1f9ff6 0%, #1f82df 50%, #1f6acb 100%)',
        'gradient-accent': 'linear-gradient(135deg, #1f6acb 0%, #1f9ff6 60%, #c65e2c 100%)',
        'gradient-glow': 'linear-gradient(135deg, rgba(31,159,246,0.15) 0%, rgba(31,106,203,0.15) 60%, rgba(198,94,44,0.12) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
