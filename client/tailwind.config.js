/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#242424",
      grey: "#F3F3F3",
      "medium-grey": "#E5E5E5",
      "dark-grey": "#6B6B6B",
      transparent: "transparent",
      red: "#FF0000",
      green: "#00FF00",
      darkGreen: "#008000",
      cyan: "#00FFFF",
      blue: "#0000FF",
      yellow: "#FFFF00",
      lightGray: "#F5F5F5",
      whitesmoke: "#F5F5F5",
      darkslategray: "#97A2A9",
      "medium-cyan": "#bae8e8",
      "light-cyan": "#e3f6f5",
      "dark-blue": "#272343"

    },
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        plusSans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
