import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@styles/abstracts/_variables.scss" as *;
            @use "@styles/abstracts/_mixins.scss" as *;
          `,
        },
      },
    },
  },
});