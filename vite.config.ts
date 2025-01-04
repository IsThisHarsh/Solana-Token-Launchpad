import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {nodePolyfills} from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});