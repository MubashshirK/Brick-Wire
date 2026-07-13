import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://brickwire.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    sanity({
      projectId: process.env.SANITY_PROJECT_ID || 'placeholder',
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: '2025-01-01',
      useCdn: true,
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
