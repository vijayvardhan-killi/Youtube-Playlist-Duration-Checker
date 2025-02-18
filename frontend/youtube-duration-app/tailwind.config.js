/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // YouTube Theme Colors
        'youtube-red': '#FF0000',
        'youtube-dark-gray': '#282828',
        'youtube-light-gray': '#AAAAAA',
        'youtube-white': '#FFFFFF',
        'youtube-black': '#000000',
        'youtube-blue': '#3EA6FF',
        'youtube-light-red': '#CC0000',
        'youtube-border-gray': '#404040',
        'youtube-light-bg': '#F9F9F9',
      },
    },
  },
  plugins: [],
};