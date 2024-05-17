module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'google'],
  plugins: ['prettier', '@stylistic/js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
        endOfLine: 'auto',
      },
    ],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'object-curly-spacing': 0,
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'operator-linebreak': 0,
    '@stylistic/js/operator-linebreak': 0,
    camelcase: 0,
    indent: 0,
  },
};
