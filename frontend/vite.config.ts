// plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import istanbul from 'vite-plugin-istanbul';

// utilities
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    vue({ template: {transformAssetUrls} }),
    vuetify({ autoImport: true, }),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.vue'],
      requireEnv: false,
      cypress: true,
      forceBuildInstrument: true
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    // Utiliza path.resolve para obtener la ruta absoluta
    alias: { '@': path.resolve(__dirname, './src') },
    extensions: [ '.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue' ],
  }
})
