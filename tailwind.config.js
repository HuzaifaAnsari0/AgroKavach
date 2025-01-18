// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"  // Include all JS and TS files in the src directory
  ],
  theme: {
    extend: {
      // Extend the default Tailwind theme with custom values
      colors: {
        green: {
          50: '#e7f6e7',   // Light green background for sections
          100: '#cfe7cf',
          600: '#4CAF50',   // Primary green for buttons, headers, etc.
          700: '#388E3C',   // Darker green for hover effects
          800: '#2E7D32',   // Even darker green
        },
        gray: {
          100: '#f7fafc',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],  // Customize the default sans-serif font
        serif: ['Georgia', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [

  ],
}
