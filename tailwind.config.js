/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yupana: {
          green: '#ccff00', // vibrant lime green from screenshot
          dark: '#1a1a1a',
          gray: '#f5f5f5',
          light: '#ffffff',
          border: '#e5e7eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
