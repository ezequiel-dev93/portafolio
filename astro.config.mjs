import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Carga variables de entorno
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    vite: {
      define: {
        'process.env': env
      }
    }
  };
});