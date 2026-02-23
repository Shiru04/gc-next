import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D61F26",
          black: "#0A0A0A",
          gray: "#F4F4F5",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
