import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginPrettierRecommended  from 'eslint-plugin-prettier/recommended';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    eslintPluginPrettierRecommended
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: import.meta.dirname
    }
    // globals: {
    // ...globals.recommended,
    // Stripe: true,
    // cy: true,
    // Cypress: true,
    // },
  },
  plugins: {
    'unused-imports': unusedImports
  },
  rules: {}
});
