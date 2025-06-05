/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif']
      },
      boxShadow: {
        'productItem': '0 4px 35px 0 rgba(168, 172, 176, 0.19)',
      },
      colors: {
        mainColor: `#5ECE7B`,
        customGray: '#8D8F9A',
        customBlack: '#1D1F22',
      },
    },
  },
  plugins: [],
}
