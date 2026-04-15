/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  // Desabilita o preflight para evitar conflito com Angular Material
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}