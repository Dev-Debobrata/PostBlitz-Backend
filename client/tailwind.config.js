/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: "Poppins",
      logo: "Lobster",
      heading: "Bebas Neue",
      body: "Work Sans",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "3rem",
      },
    },
    screens: {
      xs: "320px",
      sm: "480p",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxxl: "2560px",
    },
    extend: {
      colors: {
        primary: "#8f766e",
        secondary: "#fff3e4",
        tertiary: "#eed6c4",
        quaternary: "#372c2c",
        accent: {
          DEFAULT: "#352929",
          hover: "#6b4f4f",
        },
        paragraph: {
          DEFAULT: "#1f0c0c",
          hover: "#d8d8d8",
        },
      },
      dropShadow: {
        DEFAULT: "0px 0px 5px rgba(255, 255, 255, 0.3)",
        md: "-3px 6px 10px rgba(255, 255, 255, 0.3)",
        lg: "-5px 10px 10px rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
