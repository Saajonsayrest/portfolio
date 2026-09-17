// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sajon.com.np',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    // Keep -webkit-backdrop-filter and -webkit-mask in the built CSS: Safari 17 and older need the
    // prefixes for the glass, and the default (baseline) target drops them.
    build: { cssTarget: ['safari15', 'chrome100', 'firefox100', 'edge100'] },
  },
});
