import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for libraries that might expect it, though we rely on import.meta.env
    'process.env': {} 
  }
});