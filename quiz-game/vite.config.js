/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary','json'],
    },
    globals : true,
    environment : 'jsdom',
    css : 'ture'
  }
})
