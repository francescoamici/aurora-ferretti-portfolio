import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/v3/',
  plugins: [react(), tailwindcss()],
  server: { port: 3003 },
});
