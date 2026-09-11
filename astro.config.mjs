// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://7mza.github.io',
  integrations: [sitemap({ lastmod: new Date() })],
  vite: { plugins: [tailwindcss()] },
});
