import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
         host: '0.0.0.0', // Permite acesso de qualquer IP
         // host: '192.168.1.100', // Substitua pelo seu IP
         port: 3000,
       },
})
