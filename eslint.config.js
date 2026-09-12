import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import { tailwind4 } from 'tailwind-csstree';
import astro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';

export default defineConfig([
  includeIgnoreFile(`${import.meta.dirname}/.gitignore`),
  { ignores: ['package-lock.json'] },
  { files: ['**/*.js'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
    languageOptions: { customSyntax: tailwind4 },
    rules: { 'css/no-invalid-properties': ['error', { allowUnknownVariables: true }] },
  },
  {
    files: ['**/*.mdx'],
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: false }),
    rules: {
      ...mdx.flat.rules,
      'no-unused-expressions': 'off',
      'no-undef': 'error',
      'no-unused-vars': 'error',
    },
  },
  ...astro.configs.recommended,
]);
