/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-gray': '#262626',
      },
      backgroundImage: theme => ({
        'custom-gradient-1': 'linear-gradient(to bottom, #262626, #000)',
        'custom-gradient-2': 'linear-gradient(to bottom, #1a1a1a, #333333)',
      })
    },
  },
  plugins: [],
}

