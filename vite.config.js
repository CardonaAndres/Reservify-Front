import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite que el servidor sea accesible externamente
    port: 5173, // Puedes cambiar este puerto si es necesario
    strictPort: true, // Garantiza que Vite use el puerto especificado o falle si no está disponible
  },
})
