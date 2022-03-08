module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Sora: ["Sora", "sans-serif"],
      },
      backgroundImage: {
        'hero': "url(./grailify-29xRX4mBNWA-unsplash.jpg)"
      },
      screens: {
        'xs': {'min': '0px', 'max': '640px'},

        'sm': {'min': '640px', 'max': '767px'},

        'md': {'min': '768px', 'max': '1023px'},
  
        'lg': {'min': '1024px', 'max': '1279px'},
  
        'xl': {'min': '1280px', 'max': '1535px'},
  
        '2xl': {'min': '1535px'},
      },
    },
  },
  plugins: [],
}