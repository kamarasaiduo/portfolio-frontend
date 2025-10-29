// C:\Users\Saidu\Desktop\Link Corp Projects\Portfolio Website\saidu-portfolio p\vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // ✅ Force port 3000
    strictPort: true, // ✅ Don't try other ports if 3000 is taken
    host: true, // ✅ Listen on all addresses
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})