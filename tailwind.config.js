/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      20: "20px",
      30: "30px",
      40: "40px",
    },
    extend: {
      colors: {
        primary: "#1174FF",
        primaryHover: "#1174FFcc",
        blueShadow: "#6198DE",
      },
    },
  },
  plugins: [],
};
