/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        bebas: ['Bebas Neue', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors:{
        orangeCustom: '#f35826',
        customColor: '#f9f6ef',
        whiteCustom: '#f7f8fa',
        beige: '#f5f5dc',
        lightcyan: '#e0f7fa',
        floralwhite: '#fffaf0',
        lightbgray: '#f0f4f8',
        vibrant: '#ebe9e1'
      }
    },
  },
  plugins: [],
}