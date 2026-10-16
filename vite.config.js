import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/github-contributions': {
        target: 'https://github-contributions-api.jogruber.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github-contributions/, '/v4'),
      },
    },
  },
})
