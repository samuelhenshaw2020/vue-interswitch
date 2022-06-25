import { defineConfig } from 'vite';
import {resolve} from "path";
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [vue()],
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
  
  publicDir: resolve(__dirname, "src/public"),
  build: {
    
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'libs/index.ts'),
      name: 'Interswitch',
      fileName: (format) => `interswitch.${format}.js`,
      formats: ['umd','es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});