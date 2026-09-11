// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineHastPlugin } from 'satteri';

const externalLinks = defineHastPlugin({
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      if (/^https?:\/\//.test(node.properties?.href ?? '')) {
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', 'noopener noreferrer');
      }
    },
  },
});

export default defineConfig({
  site: 'https://7mza.github.io',
  integrations: [sitemap({ filter: (page) => page === 'https://7mza.github.io/', lastmod: new Date() }), mdx()],
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
    shikiConfig: { themes: { light: 'solarized-light', dark: 'solarized-dark' }, defaultColor: false },
  },
  env: { schema: { RAMBLINGS: envField.boolean({ context: 'server', access: 'public', default: false }) } },
  vite: { plugins: [tailwindcss()] },
});
