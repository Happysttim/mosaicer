// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([globalIgnores(['dist', 'vite.config.ts']), {
    files: ['**/*.{ts,tsx}'],
    plugins: {
        prettier: prettierPlugin,
    },
    extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs.flat.recommended,
        reactRefresh.configs.vite,
    ],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
            project: './tsconfig.app.json',
            tsconfigRootDir: import.meta.dirname,
        }
    },
    rules: {
  'prettier/prettier': ['error', {
    endOfLine: 'auto',
    singleQuote: true,
    trailingComma: 'all'
  }],
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],
},
}, ...storybook.configs["flat/recommended"]]);