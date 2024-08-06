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
      fontFamily: {
        primary: ["var(--font-poppins)","sans-serif"],
        secondary: ["var(--font-Inter)","sans-serif"],
      },
      colors:{
        dark:"#272D2D",
        light:"#F6F8FF",
        primary:"#F08700",
        secondory:"#F49F0A"
      }
    },
  },
  plugins: [require("daisyui")],
}
export default config
