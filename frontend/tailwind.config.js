/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        physio: {
          cream: '#F1F0E5',    // CannoliCream
          tan: '#E4C7B8',      // CreamTan
          safari: '#BBAA92',   // Safari
          sirocco: '#C39E89',  // Sirocco
          mocha: '#A47765',    // MochaMouse
          chanterelle: '#A28777', // Chanterelle
          amber: '#8B6454',    // Baltic Amber
          chocolate: '#56453F'  // ChocolateMartini
        }
      }
    },
  },
  plugins: [],
}