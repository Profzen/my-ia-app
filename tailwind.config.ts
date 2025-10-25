// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        surface: "var(--color-surface)",
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        muted: "var(--color-text-muted)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
      },
      borderRadius: {
        md: "var(--radius-md)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
      },
      transitionDuration: {
        fast: "200",
      }
    }
  },
  plugins: [],
}

export default config
