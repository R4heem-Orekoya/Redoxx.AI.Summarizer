/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
        Lato: ['Lato', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

