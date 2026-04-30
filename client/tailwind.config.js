/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        display: ["Cormorant Garamond", "serif"]
      },
      colors: {
        brand: {
          500: "#7192ff",
          900: "#111a37"
        },
        accent: "#e7b977"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(113, 146, 255, 0.18)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(113,146,255,0.18), transparent 28%), radial-gradient(circle at 80% 0%, rgba(231,185,119,0.16), transparent 22%), linear-gradient(135deg, rgba(15,23,42,0.94), rgba(2,6,23,0.98))"
      }
    }
  },
  plugins: []
};
