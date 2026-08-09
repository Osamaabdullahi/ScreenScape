/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10131A",
        "ink-raised": "#171B24",
        "ink-line": "rgba(237,231,217,0.12)",
        paper: "#EDE7D9",
        "paper-dim": "#8B8C93",
        gold: "#C9A15A",
        "gold-dim": "#8A7345",
        signal: "#C6432E",
      },
      fontFamily: {
        display: [
          "ui-serif",
          "Iowan Old Style",
          "Palatino Linotype",
          "URW Palladio",
          "Georgia",
          "serif",
        ],
        body: [
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SF Mono",
          "Cascadia Mono",
          "Roboto Mono",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
