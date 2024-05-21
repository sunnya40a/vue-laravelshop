import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    //outDir: '/home/chhabi/golang/aarushishop/frontend',
    //assetsDir: 'assets'
    //sourcemap: true // Ensure source maps are enabled
    outDir: 'dist', // Change this to 'dist' to place the build output in the 'dist' folder
    assetsDir: 'assets' // Ensure assets are placed in the 'assets' directory within 'dist'
    //sourcemap: true // Uncomment this line if you want to generate source maps
  }
})
