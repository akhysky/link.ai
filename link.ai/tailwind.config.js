/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#318C8F', // Bleu-vert principal
        secondary: '#2C494A', // Vert foncé pour les textes et accents
        dark: '#2C494A', // Vert foncé pour les titres et éléments importants
        light: '#C7EAEB', // Bleu clair pour les arrière-plans et éléments légers
      },
    },
  },
  plugins: [],
}
