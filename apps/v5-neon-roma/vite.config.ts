import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/v5/',
  plugins: [react(), tailwindcss()],
  server: { port: 3005 },
});
