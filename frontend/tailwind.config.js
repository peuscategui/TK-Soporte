/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F6FF',
          100: '#BAE3FF',
          200: '#7CC4FA',
          300: '#47A3F3',
          400: '#2186EB',
          500: '#0967D2',
          600: '#0552B5',
          700: '#03449E',
          800: '#01337D',
          900: '#002159',
        },
        secondary: {
          50: '#E3F9E5',
          100: '#C1F2C7',
          200: '#91E697',
          300: '#51CA58',
          400: '#31B237',
          500: '#18981D',
          600: '#0F8613',
          700: '#0E7817',
          800: '#07600E',
          900: '#014807',
        },
      },
    },
  },
  plugins: [],
}

