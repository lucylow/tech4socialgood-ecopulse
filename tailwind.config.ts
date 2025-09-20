import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // EcoPulse semantic color system
        primary: "hsl(var(--primary))",
        "primary-glow": "hsl(var(--primary-glow))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        
        // Climate-specific colors
        "earth-blue": "hsl(var(--earth-blue))",
        "toxic-green": "hsl(var(--toxic-green))",
        "pollution-red": "hsl(var(--pollution-red))",
        "ice-blue": "hsl(var(--ice-blue))",
        "desert-yellow": "hsl(var(--desert-yellow))",
        
        // Text colors
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-muted": "hsl(var(--text-muted))",
      },
      backgroundImage: {
        "gradient-earth": "var(--gradient-earth)",
        "gradient-climate": "var(--gradient-climate)",
        "gradient-warning": "var(--gradient-warning)",
      },
      boxShadow: {
        "eco": "var(--shadow-eco)",
        "climate": "var(--shadow-climate)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      transitionProperty: {
        "eco": "var(--transition-eco)",
      }
    },
  },
  plugins: [],
} satisfies Config;

export default config;