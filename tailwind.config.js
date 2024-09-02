/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
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
        hover: "rgb(249,249,250)",
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"] /* principal titulos */,
        calibri: ["Calibri", "Arial", "sans-serif"] /* secundaria  */,
      },
      boxShadow: {
        "dark-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.5)",

      },

      backgroundColor: {
        "light-gray": "rgba(76, 77, 75 , 0.3)",
      },
    },
  },

  darkMode: "class",
  plugins: [
    nextui(),
    require("daisyui"),
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
};
