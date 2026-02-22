/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Geist",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        display: ["Urbanist", "sans-serif"],
        mono: ['"Commit Mono"', '"Fira Code"', '"JetBrains Mono"', "monospace"],
      },
      colors: {
        // Surfaces
        surface: {
          DEFAULT: "#000000",
          raised: "#0a0a0a",
          card: "#111111",
          overlay: "#1a1a1a",
        },
        // Borders
        "border-subtle": "rgba(255,255,255,0.05)",
        "border-default": "rgba(255,255,255,0.08)",
        "border-strong": "rgba(255,255,255,0.15)",
        // Content
        "content-primary": "#ffffff",
        "content-secondary": "#a1a1aa",
        "content-muted": "#52525b",
        // Mapple accent — lime green
        primary: "#1eff00",
        secondary: "#15b100",
        // Grays (matching Mapple CSS)
        "gray-600": "#52525b",
        "gray-800": "#27272a",
        "gray-900": "#18181b",
      },
      backgroundImage: {
        "card-gradient": "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 70%)",
        "hero-radial":
          "radial-gradient(70% 80% at center 0%, rgba(30,255,0,0.08) 0%, rgba(0,0,0,0) 70%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
