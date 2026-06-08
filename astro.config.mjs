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
          loadPaths: [path.join(__dirname, 'src')],
          additionalData: `
            @use "styles/abstracts/_variables" as *;
            @use "styles/abstracts/_mixins" as *;
          `,
        },
      },
    },
  },
});