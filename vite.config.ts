import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    proxy: {
      '^/examples/sharedb-server/fake/.*': {
        target: 'http://localhost:8080/fake',
        rewrite: (path) => path.replace(/^\/examples\/sharedb-server\/fake/, '')
      },
      '/examples/sharedb-server': {
        target: 'ws://localhost:8080',
        ws: true,
      },
      '/examples/yjs-server': {
        target: 'ws://localhost:1234',
        ws: true,
      }
    }
  },
  base: '/examples/',
  plugins: [react()]
})
