/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "orange-button":"#FF561E",
      },
      transitionProperty: {
        'object-fit': 'object-fit'
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out'
      },
      transitionDuration: {
        '500': '500ms'
      },
      height: {
        '120': '30rem', 
      }
    },
    boxShadow:{
      navbar: '0px 10px 8px 0px rgba(3,3,4,0.03), 0 1px 2px -1px rgba(3,3,4,0.03)',
      "2xl":'0 0px 40px 0px rgba(0, 0, 0, 0.1)',
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1090px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1720px",
      // => @media (min-width: 1536px) { ... }

      "4xl": "1856px",
      // => @media (min-width: 1536px) { ... }
  },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.transition-handled': {
          transition: '0.5s ease-in-out',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

