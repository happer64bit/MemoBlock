import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [tailwindcss(), react(), tanstackRouter({
    target: "react",
    autoCodeSplitting: true
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
