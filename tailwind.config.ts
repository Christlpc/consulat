import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        congo: {
          50: '#e6f7f0',
          100: '#b3e6d1',
          200: '#80d5b2',
          300: '#4dc493',
          400: '#1ab374',
          500: '#00894F', // Couleur principale
          600: '#007540',
          700: '#006030',
          800: '#004c20',
          900: '#003810',
        },
        gold: {
          50: '#fef9e7',
          100: '#fceeba',
          200: '#fae38d',
          300: '#f8d860',
          400: '#f6cd33',
          500: '#F4C300', // Or des armoiries
          600: '#c79c00',
          700: '#9a7700',
          800: '#6d5200',
          900: '#402d00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;


