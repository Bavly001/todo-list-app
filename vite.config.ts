import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration with proxy support for the backend API
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_TARGET || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
