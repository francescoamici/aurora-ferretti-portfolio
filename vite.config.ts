import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@auror/data': path.resolve(__dirname, 'packages/data/src'),
      '@auror/i18n': path.resolve(__dirname, 'packages/i18n/src'),
      '@auror/shared-ui': path.resolve(__dirname, 'packages/shared-ui/src'),
    },
    dedupe: ['react', 'react-dom', 'i18next', 'react-i18next', 'react-router-dom', 'framer-motion'],
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
