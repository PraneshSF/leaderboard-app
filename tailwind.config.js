/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#00BFFF",
          primaryDark:"#1E90FF",
          secondary: "#2ecc71",
          danger: "#FF4500",
        },
        spacing: {
          18: "4.5rem",
        },
        borderRadius: {
          xl: "1rem",
        },
      },
    },
    plugins: [],
  };
  