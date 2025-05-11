/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  variants: {
    extend: {
      backgroundColor: ["data-selected"],
      textColor: ["data-selected"],
      fontWeight: ["data-selected"],
    },
  },
  plugins: [],
};
