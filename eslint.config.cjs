const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      globals: globals.node,
    },
    extends: [js.configs.recommended, "plugin:prettier/recommended"],
    rules: {},
  },
];
