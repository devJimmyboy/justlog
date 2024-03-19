import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import babel from 'vite-plugin-babel'
export default defineConfig({
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  // define: {
  //   global: 'window',
  // },
  plugins: [react({})],
  build: {
    rollupOptions: {},
    sourcemap: 'inline',
  },
  optimizeDeps: {
    exclude: [],
  },

  server: {
    proxy: {
      '/channel': {
        target: 'http://localhost:8025',
      },
      '/list': {
        target: 'http://localhost:8025',
      },
      '/swagger.json': {
        target: 'http://localhost:8025',
      },
    },
  },
})
