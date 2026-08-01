/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "380px",
        md: "768px",
        lg: "1025px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        Poppins: "Poppins, sans-serif",
        Pixelify: "Pixelify Sans, sans-serif",
      },
      boxShadow: {
        // Both themes render surfaces as raised. Light mode previously used an
        // inset shadow, which read as a depression carved into a page painted
        // the same colour as the card sitting on it.
        neumorphism: "10px 10px 28px #b9b9bd, -10px -10px 28px #ffffff",
        "dark-neumorphism": "10px 10px 28px #1b1b1e, -10px -10px 28px #333338",
        "button-neumorphism": "5px 5px 12px #bfbfc4, -5px -5px 12px #ffffff",
        "dark-button-neumorphism": "5px 5px 12px #1f1f22, -5px -5px 12px #2f2f34",
        pressed: "inset 4px 4px 9px #bfbfc4, inset -4px -4px 9px #ffffff",
        "dark-pressed": "inset 4px 4px 9px #1f1f22, inset -4px -4px 9px #2f2f34",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(0.5rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 220ms ease-out both",
      },
    },
  },
  plugins: [],
};
