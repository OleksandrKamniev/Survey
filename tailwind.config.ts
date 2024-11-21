import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--foreground)',
        'dark-grey': '#333333',
        'light-blue': '#EAEEF7',
        'light-theme-color': '#FFF0F0',
        'dark-purple': '#6A3AA2',
      },
      fontFamily: {
        default: 'Open Sans',
      },
    },
  },
  plugins: [],
} satisfies Config;
