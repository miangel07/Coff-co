/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sena: "rgb(57, 169, 0)",
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"] /* principal titulos */,
        calibri: ["Calibri", "Arial", "sans-serif"] /* secundaria  */,
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("daisyui")],
};
