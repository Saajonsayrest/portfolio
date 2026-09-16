// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sajon.com.np',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
