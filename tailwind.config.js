/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1C1C1E',
        'deep-gray': '#2B2B2E',
        'electric-blue': '#007BFF',
        'white-smoke': '#F5F5F7',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'fira-code': ['Fira Code', 'monospace'],
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
