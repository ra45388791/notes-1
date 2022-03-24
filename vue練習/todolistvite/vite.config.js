import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//儲存自動更新
import FullReload from 'vite-plugin-full-reload'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    FullReload(['config/routes.rb', 'app/views/**/*'])  //儲存自動更新
  ],

})
