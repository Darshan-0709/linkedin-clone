/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#378FE9',
        'custom-green': '#5F9B41',
        'custom-yellow': '#C37D16',
        'custom-orange': '#E16745',
      },
    },
  },
  plugins: [],
}

