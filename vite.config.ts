import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer({
      // Optimize images in public folder as well
      includePublic: true,
      // Show optimization stats in console
      logStats: true,
      // WebP optimization
      webp: {
        quality: 70,
      },
      // JPEG optimization
      jpeg: {
        quality: 70,
      },
      // JPG optimization
      jpg: {
        quality: 70,
      },
      // PNG optimization
      png: {
        quality: 70,
      },
      // SVG optimization with SVGO
      svg: {
        multipass: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
