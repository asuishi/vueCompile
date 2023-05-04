import { fileURLToPath, URL } from 'node:url'
// import analyzer from 'rollup-plugin-visualizer';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions:{
      output: {
        manualChunks: {
          lodash: ['lodash'],
          vendor: ['vue', 'pinia'],
          compiler: ['compiler-step'],
          sfc: ['@vue/compiler-sfc']
        }
      }
    }
  }
 
})
