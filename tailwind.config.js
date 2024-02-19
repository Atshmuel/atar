/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Lato,Segoe UI ,monospace",
    },
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
    },

    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
