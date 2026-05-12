import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const CNB_BASE_FALLBACK = 'https://www.cnb.cz';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/cnb': {
          target: env.VITE_CNB_BASE_URL ?? CNB_BASE_FALLBACK,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/cnb/, ''),
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  };
});
