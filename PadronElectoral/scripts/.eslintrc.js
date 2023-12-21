module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', // Use Prettier for code formatting
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      // Your project-specific rules go here
      'no-console': 'off', // You might want to allow console statements during development
    },
  };
  