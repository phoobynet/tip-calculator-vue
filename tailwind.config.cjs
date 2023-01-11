/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Space Mono', 'sans-serif'],
    },
    screens: {
      xs: '375px',
      lg: '1440px',
    },
    fontSize: {
      // 13px
      xxs: ['0.813rem'],
      // 16px
      xs: ['1rem'],
      // 20px
      sm: ['1.25rem'],
      // 24px
      lg: ['1.5rem'],
      // 32px
      xl: [
        '2rem',
        {
          letterSpacing: '-0.67px',
        },
      ],
      '2xl': [
        '3rem',
        {
          letterSpacing: '-1px',
        },
      ],
    },
    colors: {
      'strong-cyan': 'hsl(172, 67%, 45%)',
      'very-dark-cyan': 'hsl(183, 100%, 15%)',
      'dark-grayish-cyan': 'hsl(186, 14%, 43%)',
      'grayish-cyan': 'hsl(184, 14%, 56%)',
      'light-cyan': 'hsl(173,61%,77%)',
      'light-grayish-cyan': 'hsl(185, 41%, 84%)',
      'very-light-grayish-cyan': 'hsl(189, 41%, 97%)',
      'error-red': 'hsl(13, 70%, 60%)',
      white: 'hsl(0,0%,100%)',
    },
  },
  plugins: [],
}
