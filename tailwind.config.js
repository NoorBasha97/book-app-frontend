/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB',  //butttons color
        'secondary':'#0D0842', //text  color
        'blackBG':'#F3F3F3',   //baclground color
        'Favorite':'#FF5841',
      },
      fontFamily:{
        'primary':["Montserrat", "sans-serif"],
        'secondary':["Nunito Sans", "sans-serif"],
        
      }
    },
  },
  plugins: [],
}
