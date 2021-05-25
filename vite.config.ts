import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  // 定义相对路径，@代替
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      "pages": resolve('src/pages/'),
      "components": resolve('src/components/'),
      "utils": resolve('src/utils/'),
      "routes": resolve('src/routes/'),
      "styles": resolve('src/styles/'),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8012,
    open: true,
  },
})
