import type { Config } from "tailwindcss";

// Brand tokens: black + gold, carried over from the legacy site's identity.
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#000000",
          soft: "#0a0a0a",
          raised: "#161616",
        },
        gold: {
          DEFAULT: "#FFD700",
          dim: "#b8991f",
          glow: "rgba(255, 215, 0, 0.35)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 10px 30px rgba(255, 215, 0, 0.2)",
        "gold-lg": "0 15px 40px rgba(255, 215, 0, 0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
