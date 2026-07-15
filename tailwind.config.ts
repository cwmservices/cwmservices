import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Typography ────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-geist)", "sans-serif"],
        nav: ["var(--font-jakarta)", "sans-serif"], // add this
        primary: ["var(--font-outfit)", "sans-serif"],
        secondary: ["var(--font-geist)", "sans-serif"],
      },
      // ── Brand Colours ─────────────────────────────────────────────
      colors: {
        dark: "#0F1420",   // deep ink navy
        light: "#F7F8FC",   // barely-blue off-white
        primary: "#F08700",   // signature amber-orange
        secondary: "#F5A623",   // golden amber (hover / gradient end)

        surface: {
          DEFAULT: "#F7F8FC",
          muted: "#EDEEF5",
          dark: "#161C2D",
          "dark-muted": "#1D2538",
        },
        ink: {
          DEFAULT: "#0F1420",
          muted: "#5A6075",
          dark: "#E4E7F2",
          "dark-muted": "#8892AA",
        },
        border: {
          light: "#DDE0EE",
          dark: "#252E44",
        },
      },

      // ── Shadows ───────────────────────────────────────────────────
      boxShadow: {
        glow: "0 4px 24px rgba(240,135,0,0.38)",
        "glow-sm": "0 2px 12px rgba(240,135,0,0.22)",
        nav: "0 4px 32px rgba(15,20,32,0.08)",
        "nav-dark": "0 4px 32px rgba(0,0,0,0.45)",
      },

      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [require("daisyui")],

  // ── DaisyUI theme tokens (optional but keeps btn etc. on-brand) ───
  daisyui: {
    themes: [
      {
        cwmlight: {
          "primary": "#F08700",
          "primary-content": "#ffffff",
          "secondary": "#F5A623",
          "accent": "#F08700",
          "neutral": "#0F1420",
          "base-100": "#F7F8FC",
          "base-200": "#EDEEF5",
          "base-300": "#DDE0EE",
          "base-content": "#0F1420",
        },
        cwmdark: {
          "primary": "#F08700",
          "primary-content": "#ffffff",
          "secondary": "#F5A623",
          "accent": "#F08700",
          "neutral": "#E4E7F2",
          "base-100": "#0F1420",
          "base-200": "#161C2D",
          "base-300": "#1D2538",
          "base-content": "#E4E7F2",
        },
      },
    ],
    darkTheme: "cwmdark",
  },
} as Config & { daisyui?: object }

export default config