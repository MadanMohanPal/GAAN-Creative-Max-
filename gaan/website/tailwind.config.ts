import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amoled: {
          950: "#000000",
          900: "#060608",
          850: "#0C0C12",
          800: "#13131C",
          700: "#1D1D2B",
          600: "#2A2A3E",
        },
        gaan: {
          purple: "#8B5CF6",
          violet: "#7C3AED",
          fuchsia: "#D946EF",
          pink: "#EC4899",
          neon: "#C084FC",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "primary-glow": "linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)",
        "card-dark": "linear-gradient(180deg, rgba(25, 23, 36, 0.6) 0%, rgba(10, 10, 14, 0.8) 100%)",
      },
      boxShadow: {
        "purple-glow": "0 0 25px -5px rgba(139, 92, 246, 0.4)",
        "neon-glow": "0 0 35px -5px rgba(192, 132, 252, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
