/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ios: {
          lightBg: '#F5F6F8',
          lightSurface: '#FFFFFF',
          lightSecondary: '#F0F2F5',
          lightText: '#172033',
          lightMuted: '#687386',
          lightBorder: '#E4E7EC',
          navy: '#173B67',
          navyDark: '#0F2642',
          navyLight: '#24528D',
          green: '#16866B',
          greenDark: '#106450',
          greenLight: '#1BA07F',
          darkBg: '#101114',
          darkSurface: '#1A1C20',
          darkSecondary: '#24272D',
          darkText: '#F5F6F7',
          darkMuted: '#A0A6B2',
          darkBorder: '#30343B',
          red: '#D9383A',
          amber: '#E07A10',
          blue: '#1976D2',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        'ios-sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'ios': '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'ios-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'ios-sheet': '0 -8px 24px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'ios': '10px',
        'ios-lg': '14px',
        'ios-xl': '18px',
        'ios-full': '9999px',
      }
    },
  },
  plugins: [],
}
