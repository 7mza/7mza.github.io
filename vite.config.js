import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://7mza.github.io/';
const now = new Date();
const buildDay = now.toISOString().slice(0, 10);
const [year, month, day] = buildDay.split('-');
const vars = {
  buildIso: `${now.toISOString().slice(0, 16)}Z`,
  buildDate: `${day}-${month}-${year}`,
  timezone: new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', timeZoneName: 'short' })
    .formatToParts(now)
    .find((part) => part.type === 'timeZoneName').value,
};

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    {
      name: 'build-metadata',
      transformIndexHtml: (html) => html.replace(/\{\{(\w+)\}\}/g, (token, key) => vars[key] ?? token),
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}</loc>
    <lastmod>${buildDay}</lastmod>
  </url>
</urlset>
`,
        });
      },
    },
  ],
});
