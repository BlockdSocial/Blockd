/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blockd: '#fc6c14',
        bgcolor: '#0f1238',
        darkgray: '#1c1c1c',
        lightgray: '#242424',
        darkblue: '#181c44',
      },
    },
  },
  borderWidth: {
    '3': '3px',
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
