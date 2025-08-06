import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["d2628194b326.ngrok-free.app", "swift-sites-hear.loca.lt", "https://shiny-facts-wish.loca.lt", "shiny-facts-wish.loca.lt"]
  }
})
