/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans']
      },
      colors: {
        primary: {
          DEFAULT: '#db2777', // pink-600
        },
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}