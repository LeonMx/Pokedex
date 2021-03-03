const colors = require('./styles/colors')
const plugin = require('tailwindcss/plugin')
const pseudoElementsPlugin = require('tailwindcss-pseudo-elements')
const childrenPlugin = require('tailwindcss-children')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors,
      minWidth: (theme) => theme('spacing'),
      maxWidth: (theme) => theme('spacing'),
      minHeight: (theme) => theme('spacing'),
      maxHeight: (theme) => theme('spacing'),
    },
  },
  variants: {
    extend: {
      textColor: [
        'responsive',
        'hover',
        'focus',
        'before',
        'after',
        'hover_before',
        'hover_after',
        'focus_before',
        'focus_after',
      ],
      opacity: ['disabled'],
    },
  },
  plugins: [
    pseudoElementsPlugin,
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          '.empty-content': {
            content: "''",
          },
        },
        ['before']
      )
    }),
    childrenPlugin,
  ],
}
