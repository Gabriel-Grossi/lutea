/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        22:'repeat(auto-fill, minmax(22rem, 1fr))',
        12:'repeat(auto-fill, minmax(12rem, 1fr))'
      },
      gridTemplateRows:
      {
        5:'repeat(auto-fill, minmax(5rem, 1fr))'
      },
      backgroundImage:{
        'hero': 'url("https://images.unsplash.com/photo-1592598015799-35c84b09394c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")'
      }
    },
  },
  plugins: [],
}