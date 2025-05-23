/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            h1: { color: '#1e40af' }, // blue-800
            h2: { color: '#1e40af' },
            h3: { color: '#1e40af' },
            h4: { color: '#1e40af' },
            h5: { color: '#1e40af' },
            h6: { color: '#1e40af' },
            code: {
              backgroundColor: '#f0f0f0',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents }) {
      addComponents({
        '.prose': {
          '& pre': {
            borderRadius: '0.375rem',
            padding: '1rem',
          },
          '& blockquote': {
            borderLeftWidth: '4px',
            borderLeftColor: '#e5e7eb',
            paddingLeft: '1rem',
            fontStyle: 'italic',
            color: '#6b7280',
          },
          '& table': {
            width: '100%',
            tableLayout: 'auto',
            textAlign: 'left',
            borderCollapse: 'collapse',
          },
          '& th': {
            padding: '0.5rem',
            borderBottomWidth: '2px',
            borderColor: '#e5e7eb',
            fontWeight: '600',
          },
          '& td': {
            padding: '0.5rem',
            borderBottomWidth: '1px',
            borderColor: '#e5e7eb',
          },
        },
      });
    },
  ],
}