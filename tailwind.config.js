/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F3EE',
        canvasDim: '#EFEAE1',
        ink: '#17140F',
        charcoal: '#524A3E',
        stone: '#DCD5C6',
        stoneDark: '#B9AE97',
        brass: '#8A6A3B',
        brassLight: '#A8875A',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        content: '1360px',
      },
    },
  },
  plugins: [],
};
