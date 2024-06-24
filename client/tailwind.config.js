/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '380px',
        'md': '768px',
        'lg': '1025px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        "Poppins": 'Poppins, sans-serif',
        "Pixelify": 'Pixelify Sans, sans-serif'
      },
      boxShadow: {
        'neumorphism': 'inset 20px 20px 60px #c2c2c2, inset -20px -20px 60px #ffffff',
        'dark-neumorphism': '20px 20px 60px #212124, -20px -20px 60px #2d2d30',
        'button-neumorphism': '7px 7px 13px #c2c2c2, -5px -5px 13px #ffffff',
        'dark-button-neumorphism': '7px 7px 13px #212124, -5px -5px 13px #2d2d30' 
      },
    },
  },
  plugins: [],
}