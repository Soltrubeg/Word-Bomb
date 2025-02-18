// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://soltrubeg.github.io',
  base: 'Word-Bomb',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({
    mode: 'standalone'
  })
});