module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    "requireConfigFile": false,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "object-curly-spacing": 0,
    "linebreak-style": 0,
    "max-len": ["error", { "code": 100 }],
    "camelcase": 0,
    "indent": 0,
  },
};
