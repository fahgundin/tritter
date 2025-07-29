import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sveltekit()],
  server: {
         host: '0.0.0.0', 
         cors: {
              origin: ['tritter.onrender.com', 'http://localhost:5173'],
              methods: ['GET', 'POST','PUT', 'DELETE'],
              allowedHeaders: ['Content-Type']
		      },
		    allowedHosts: ['mysubdomain.domain.io'],

         port: 3000,
       },
})
