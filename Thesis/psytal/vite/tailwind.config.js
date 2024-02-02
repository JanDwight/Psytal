/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'franklin' : ['Franklin Gothic Medium' , 'sans serif'],
      },
      colors:{
              'viridian' : '#588665',
              'viridianHue' : '#496C54',
              'neonGreen' : '#35B736',
              'highlightGreen' : '#B5E3B4',
              'grayGreen' : '#DBEADC',
              'dash1' : '#1F9563',
              'dash2' : '#1F9586',
              'dash3' : '#20951F',
              'dash4' : '#6B951F',
      }
    },
  },
  variants:{},
  plugins: [
    require("@tailwindcss/forms")
  ],
}

