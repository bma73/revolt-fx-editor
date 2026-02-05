import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      url: fileURLToPath(new URL('./src/lib/url-browser.js', import.meta.url)),
    },
  },
  base: './',
  publicDir: 'static',
  server: {
    port: 8080,
  },
})
