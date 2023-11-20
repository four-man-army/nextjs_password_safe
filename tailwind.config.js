const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-180deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        rotate: "spin 200ms linear",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            primary: {
              50: "#f5f5ff",
              100: "#ebebff",
              200: "#d0d0ff",
              300: "#b5b5ff",
              400: "#7f7fff",
              500: "#4949ff",
              600: "#4242e6",
              700: "#3636b4",
              800: "#292981",
              900: "#172554",
              foreground: "white",
              DEFAULT: "#172554",
            },
            danger: {
              DEFAULT: "#ef4444",
            },
          },
        },
        dark: {
          layout: {},
          colors: {},
        },
      },
    }),
  ],
};
