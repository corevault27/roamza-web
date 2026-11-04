// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical production origin. Override with SITE_URL (see .env.example).
const SITE_URL = process.env.SITE_URL || 'https://roamzacleaningservices.com';

// Never in the sitemap (noindex / utility pages).
const SITEMAP_EXCLUDE = ['/404', '/thank-you/'];

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: { locales: ['en'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } },
  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.some((p) => new URL(page).pathname.startsWith(p)),
      changefreq: 'monthly',
    }),
  ],
  // Cast: @tailwindcss/vite and Astro bundle different Vite type versions (harmless).
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
  image: { responsiveStyles: false },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
});
