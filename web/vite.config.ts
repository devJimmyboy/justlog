import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import babel from 'vite-plugin-babel'
export default defineConfig({
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  define: {
    global: {},
  },
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {},
  },
  optimizeDeps: {
    exclude: [],
  },
  server: {
    proxy: {
      '/swagger.json': {
        target: 'http://localhost:8025',
      },
    },
  },
})
