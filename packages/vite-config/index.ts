import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

interface CreateConfigOptions {
  base: string;
  port: number;
}

export function createViteConfig({ base, port }: CreateConfigOptions): UserConfig {
  return defineConfig({
    base,
    plugins: [react(), tailwindcss()],
    server: {
      port,
      strictPort: false,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  }) as UserConfig;
}
