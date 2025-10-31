import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // ✅ Force port 3000 for local development
    strictPort: true, // ✅ Don't try other ports if 3000 is taken
    host: true, // ✅ Listen on all addresses
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // ✅ Add these for production build
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  },
  // ✅ Base public path for deployment
  base: '/'
})