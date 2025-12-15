/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Inter", "ui-sans-serif", "system-ui"],
        },
        colors: {
          custom1: "#00B7B5",
          custom2: "#03A6A4",
          custom3: "#D9D9D9",
        },
      },
    },
    plugins: [],
  };
  