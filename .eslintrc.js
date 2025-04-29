module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['tailwindcss'],
  rules: {
    // override/add rules if needed
  },
};
