module.exports = {
  ignorePatterns: ['dist/**/*'],
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    camelcase: 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        overrides: [
          {
            files: '*.json',
            options: {
              parser: 'json'
            }
          },
          {
            files: '*.html',
            options: {
              parser: 'html'
            }
          },
          {
            files: '*.css',
            options: {
              parser: 'css'
            }
          },
          {
            files: '*.md',
            options: {
              parser: 'markdown'
            }
          }
        ]
      }
    ],
    'import/order': 'error'
  }
}
