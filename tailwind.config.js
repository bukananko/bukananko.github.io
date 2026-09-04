/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#050711",
        space: {
          950: "#030712",
          900: "#070b19",
          850: "#0c1328",
          800: "#111b38",
          700: "#1e2c56",
        },
        cosmic: {
          cyan: "#00f0ff",
          purple: "#9d4edd",
          blue: "#3b82f6",
          amber: "#f59e0b",
          emerald: "#10b981",
          rose: "#f43f5e",
        },
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(157, 78, 221, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
      },
    },
  },
  plugins: [],
};

