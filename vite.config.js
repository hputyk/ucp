import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ucp/',   // ← имя репозитория (обязательно со слэшами)
})