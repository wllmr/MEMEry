/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app.tsx", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        electricBlue: "#007BFF",
        vibrantOrange: "#FF5722",
        limeGreen: "#CDDC39",
        sunnyYellow: "#FFEB3B",
        brightPurple: "#9C27B0",
        teal: "#009688",
        hotPink: "#E91E63",
        skyBlue: "#03A9F4",
      },
    },
  },
  plugins: [],
};
