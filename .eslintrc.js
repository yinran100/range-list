const eslintrc = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/generic-type-naming': 0,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/member-ordering': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-extra-parens': 0,
    '@typescript-eslint/no-magic-numbers': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-type-alias': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/prefer-for-of': 1,
    // coding style
    '@typescript-eslint/member-delimiter-style': [0, {
      delimiter: 'none'
    }],
    '@typescript-eslint/semi': ['error', 'never'],
    'jest/expect-expect': ["off"],

    'space-infix-ops': ['error'],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never'
    }],
    'space-before-function-paren': ['error', 'always'],
    'semi': ['error', 'never'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'no-param-reassign': 0,
    'no-restricted-globals': ['error', 'event']
  },
}

module.exports = eslintrc
