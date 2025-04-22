import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  vite: {
    server: {
      proxy: {
        '/api': 'http://localhost:4321/api'
      }
    }
  }
});