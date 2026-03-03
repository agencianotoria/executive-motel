import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/executive-motel/',
  plugins: [
    tailwindcss(),
  ],
  build: {
    minify: 'esbuild',
    cssMinify: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg|webp|ico)$/.test(name ?? '')){
              return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(woff|woff2)$/.test(name ?? '')) {
              return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  }
})