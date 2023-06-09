/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        '1': '0px 0px 20px 5px rgba(255, 0, 255, 0.5)',
      },
      colors: {
        'my-magenta': 'rgba(255, 0, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
