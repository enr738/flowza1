import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#4DA6FF",
          purple: "#7C3AED",
        },
        background: {
          dark: "#1A1628",
        },
        surface: "#231D35",
        border: "#2E2845",
        text: {
          primary: "#FFFFFF",
          secondary: "#9E97B8",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #4DA6FF 0%, #7C3AED 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
