import globals from 'globals';
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.js', '**/*.jsx']
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  prettierRecommended,
  {
    rules: {
      'no-console': 'off',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          printWidth: 100,
          semi: true,
          singleQuote: true,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ]
    }
  }
];
