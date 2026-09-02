import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import { tailwind4 } from 'tailwind-csstree';

const tailwindWithDaisyui = (prev) => {
  const syntax = tailwind4(prev);
  return {
    ...syntax,
    atrules: {
      ...syntax.atrules,
      plugin: {
        ...syntax.atrules.plugin,
        descriptors: {
          themes: '<any-value>',
          include: '<any-value>',
          exclude: '<any-value>',
          name: '<any-value>',
          default: '<any-value>',
          prefersdark: '<any-value>',
          'color-scheme': '<any-value>',
        },
      },
    },
  };
};

export default defineConfig([
  { ignores: ['dist', 'package-lock.json'] },
  { files: ['**/*.js'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
    languageOptions: { customSyntax: tailwindWithDaisyui },
    rules: { 'css/no-invalid-properties': ['error', { allowUnknownVariables: true }] },
  },
]);
