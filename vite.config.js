import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import Unfonts from 'unplugin-fonts/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  Unfonts({
    custom: {
      families: [
        {
          name: 'Gilroy',
          local: 'Gilroy',
          src: './src/assets/fonts/Gilroy.ttf',
        },
      ],
      display: 'auto',
      preload: true,
      prefetch: false,
    },
  }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})


