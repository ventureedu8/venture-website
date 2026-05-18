import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 關鍵在這裡！必須告訴系統您的網站在這個資料夾底下：
  base: '/venture-website/', 
})