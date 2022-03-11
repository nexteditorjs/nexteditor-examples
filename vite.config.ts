import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    proxy: {
      '/examples/sharedb-server': {
        target: 'ws://localhost:8080',
        ws: true,
      }
    }
  },
  base: '/examples/',
  plugins: [react()]
})
