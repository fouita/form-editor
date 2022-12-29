module.exports = {
  darkMode: 'class',
  important: ".ft",
  content: ["./src/**/*.{html,js,svelte}","node_modules/form-builder/**/*.svelte"],
  safelist: [
    {
      pattern: /^w-1\/(\d+)$/,
      variants: ['sm']
    },
    {
      pattern: /justify-(\w+)$/
    },
    {
      pattern: /items-(\w+)$/
    },
    {
      pattern: /text-(left|right|center|justify)$/
    },
    {
      pattern: /text-(left|right|center|justify)$/
    },
    {
      pattern: /(bg|text)-(gray|red|yellow|green|blue|indigo|purple|pink)-(\d{1}0{1,2})$/,
    },
    {
      pattern: /leading-(\w+)$/,
    },
    {
      pattern: /-?(m|p)[tlrb]?-(0|px|0.5|1|2|3|4|5|10|16|20|40|60)$/,
    },
    {
      pattern: /(w|h)-(auto|full|0|3|4|10|16|20|32|40|60|80|96|128)$/,
    },
    {
      pattern: /rounded-(\w+)$/,
    },
    {
      pattern: /max-w-(\w+)$/,
    },
    
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 
        '"Helvetica Neue"', 'Helvetica', 'Arial', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
      },
      "colors": {
        "primary": "rgb(var(--ft-primary,59 130 246) / <alpha-value>)",
        "secondary": "rgb(var(--ft-secondary,251 113 133) / <alpha-value>)",
        "tertiary": "rgb(var(--ft-tertiary,31 41 55) / <alpha-value>)",
        "quaternary": "rgb(var(--ft-quaternary,250 204 21) / <alpha-value>)",
        "transparent": "transparent",
        "current": "currentColor"
      },
      lineHeight: {
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
      },
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
      128: '512px',
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      // strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
}
