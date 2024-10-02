import { defineConfig } from 'vite';
import path from 'path';
import inlineCss from './vite-plugin-inline-css';
import { terser } from 'rollup-plugin-terser';  // Import Terser for minification and obfuscation

export default defineConfig({
  plugins: [
    inlineCss(),
    terser({
      compress: true,  // Enable compression
      mangle: true,    // Enable variable and function name mangling
      format: {
        beautify: false,  // Ensure the output is not beautified
        comments: false,  // Remove all comments
        semicolons: true  // Ensure semicolons are used to separate statements
      }
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'AdShuffle',
      fileName: (format) => `ad-shuffle.${format}.js`
    },
    rollupOptions: {
      output: {
        globals: {
          'vite-plugin-sass': 'sass'
        }
      }
    },
    terserOptions: {
      compress: true,
      mangle: true,  // Enable name mangling (obfuscation)
      format: {
        beautify: false,  // Ensure the output is not beautified
        comments: false,  // Remove comments from output
        semicolons: true  // Ensure semicolons are used to separate statements
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
});
