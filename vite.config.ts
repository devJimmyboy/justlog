import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import babel from 'vite-plugin-babel'
export default defineConfig({
  plugins: [react({})],
  build: {
    sourcemap: true,
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
