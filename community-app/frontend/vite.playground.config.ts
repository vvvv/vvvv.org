import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@scss': '/external/scss', // Alias for the symbolic link to the SCSS folder
      '@css': '/external/css',   // Alias for the symbolic link to the CSS folder
      '@static': '/external/static',
    },
  },
  root: ".", // project root (where playground.html is)
  server: {
    open: "playground/index.html", // auto-open playground
  },
  build: {
    rollupOptions: {
      input: {
        playground: "playground/main.js", // only playground entry
      },
    },
    outDir: "dist-playground", // separate build output
  },
});