import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyBannerRotation',
      fileName: (format) => `my-banner-rotation.${format}.js`
    },
    rollupOptions: {
      output: {
        globals: {
          'vite-plugin-sass': 'sass'
        }
      }
    }
  }
})
