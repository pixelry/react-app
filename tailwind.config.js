const defaultTheme = require('tailwindcss/defaultTheme');

const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  content: [`${__dirname}/**/*.{ejs,css,tsx,jsx}`],
  theme: {
    colors,
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '2rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      maxWidth: {
        '8xl': '88rem',
      },
      typography: ({ theme }) => ({
        base: {
          css: {
            '--tw-prose-body': theme('colors.base[800]'),
            '--tw-prose-headings': theme('colors.base[900]'),
            '--tw-prose-lead': theme('colors.base[700]'),
            '--tw-prose-links': theme('colors.base[900]'),
            '--tw-prose-bold': theme('colors.base[900]'),
            '--tw-prose-counters': theme('colors.base[600]'),
            '--tw-prose-bullets': theme('colors.base[400]'),
            '--tw-prose-hr': theme('colors.base[300]'),
            '--tw-prose-quotes': theme('colors.base[900]'),
            '--tw-prose-quote-borders': theme('colors.base[300]'),
            '--tw-prose-captions': theme('colors.base[700]'),
            '--tw-prose-code': theme('colors.base[900]'),
            '--tw-prose-pre-code': theme('colors.base[100]'),
            '--tw-prose-pre-bg': theme('colors.base[900]'),
            '--tw-prose-th-borders': theme('colors.base[300]'),
            '--tw-prose-td-borders': theme('colors.base[200]'),
            '--tw-prose-invert-body': theme('colors.base[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.base[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.base[400]'),
            '--tw-prose-invert-bullets': theme('colors.base[600]'),
            '--tw-prose-invert-hr': theme('colors.base[700]'),
            '--tw-prose-invert-quotes': theme('colors.base[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.base[700]'),
            '--tw-prose-invert-captions': theme('colors.base[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.base[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.base[600]'),
            '--tw-prose-invert-td-borders': theme('colors.base[700]'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
