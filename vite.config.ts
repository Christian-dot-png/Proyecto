/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

// Configuración principal de Vite
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    emptyOutDir: true,
  },
})

// Configuración de Vitest (separada, pero en el mismo archivo funciona)
export const test = {
  globals: true,
  environment: 'jsdom',
}