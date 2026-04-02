import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }

          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }

          if (id.includes('node_modules/@supabase')) {
            return 'supabase-vendor';
          }

          if (id.includes('node_modules/recharts')) {
            return 'charts-vendor';
          }

          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
          }

          if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark-gfm') || id.includes('node_modules/mdast-util') || id.includes('node_modules/micromark')) {
            return 'markdown-vendor';
          }
        },
      },
    },
  },
  define: {
    // Polyfill process.env for libraries that might expect it, though we rely on import.meta.env
    'process.env': {} 
  }
});
