module.exports = {
    parserOptions: {
      ecmaVersion: 2018, // Set the ECMAScript version you are using
    },
    env: {
      browser: true, // Enable browser global variables
      es6: true, // Enable ES6 features
    },
    extends: ['eslint:recommended'], // Use recommended ESLint rules
    rules: {
      // Add additional rules here as needed
      'no-console': 'off', // You can turn off 'no-console' rule if you want to use console.log
    },
  };
  