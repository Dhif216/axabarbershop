/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f5f5f0",
        card: "#1a1a1a",
        "card-foreground": "#f5f5f0",
        primary: "#1F4D3A",
        "primary-foreground": "#f5f5f0",
        secondary: "#2a2a2a",
        "secondary-foreground": "#f5f5f0",
        muted: "#2a2a2a",
        "muted-foreground": "#a0a0a0",
        accent: "#d4a574",
        "accent-foreground": "#0a0a0a",
        destructive: "#d4183d",
        "destructive-foreground": "#ffffff",
        border: "#2a2a2a",
        input: "#1a1a1a",
        "input-background": "#1a1a1a",
        ring: "#1F4D3A",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
