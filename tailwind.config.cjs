/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    minWidth: {
      card: "14rem",
    },
    maxWidth: {
      card: "20rem",
      "1/2": "50%",
      pImg: "600px",
      "8/10": "80%",
    },
    maxHeight: {
      card: "20rem",
    },
    screens: {
      my: "870px",
    },
  },
  plugins: [],
};
