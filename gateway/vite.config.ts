import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Generate proxy rules for all versions: /v1/ -> localhost:3001, etc.
const proxy: Record<string, string> = {};
for (let i = 1; i <= 15; i++) {
  proxy[`/v${i}`] = `http://localhost:${3000 + i}`;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy,
  },
});
