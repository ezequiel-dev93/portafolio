import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Configuración diferente para desarrollo y producción
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  output: 'server',
  adapter: isDev ? undefined : vercel(), // Solo usa el adaptador en producción
  vite: {
    server: {
      fs: {
        strict: false
      }
    },
    optimizeDeps: {
      force: isDev // Forza la optimización en desarrollo
    }
  }
});