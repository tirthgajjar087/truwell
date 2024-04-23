/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'rblue': '#2744DF',
        'rblack': '#323232',
        'rgray': '#767B81'
      },
      
      boxShadow: {
        'myshadow': 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        'aside': "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
        // 'aside': "rgba(0,0,0,0.15)_1px_2px;",
        "header": "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;"
      },

    },
  },
  plugins: [],
}

