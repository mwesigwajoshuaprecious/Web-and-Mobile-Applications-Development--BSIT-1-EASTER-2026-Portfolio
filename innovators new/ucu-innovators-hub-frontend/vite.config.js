import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,           // your current port
    open: '/login'        // ← THIS IS THE MAGIC LINE
  }
});