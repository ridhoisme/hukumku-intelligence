/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "brand-lg": 1200,
      },
      colors: {
        brand: {
          green: { 100: "#79C043", 200: "#38A169", 300: "#007861" },
          grey: { 100: "#6C7677", 200: "#5D696A", 300: "#F8F8F8" },
          black: "#010101",
          "black-2": "#1E1E1E",
          navy: "#002A40",
          blue: { 100: "#0077B5" },
        },
        granted: "var(--color-granted)",
        rejected: "var(--color-rejected)",
        partially: "var(--color-partially)",
      },
      fontFamily: {
        work: ["Work Sans", "sans-serif"],
      },
      boxShadow: {
        brand: "0px 4px 20px 0px #012D411A",
      },
    },
  },
  plugins: [],
};
