import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#f7f9fa",
        "primary-dark": "#003E3B",
        primary: "#00A49C",
        accent: "#AFE035",
        warning: "#FAE56B",
      },
      boxShadow: {
        custom: "0px 4px 8px -2px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
