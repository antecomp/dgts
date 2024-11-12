import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [],
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})