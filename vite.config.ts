import { defineConfig } from 'vite';
import path from 'path';
import inlineCss from './vite-plugin-inline-css';

export default defineConfig({
  plugins: [inlineCss()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyBannerRotation',
      fileName: (format) => `ad-shuffle.${format}.js`
    },
    rollupOptions: {
      output: {
        globals: {
          'vite-plugin-sass': 'sass'
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
});
