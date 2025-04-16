import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    // visualizer({
    //   open: true, // Automatically open the report in the browser
    //   filename: 'bundle-report.html', // Output file
    // }),
  ],
  resolve: {
    alias: {
      '@': '/src'
    },
  },
  base: "http://localhost:1313/",
    build: {
      outDir: "../../static/js/vue/",
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          showdown: ['showdown'],
          keycloak: ['keycloak-js'],
          leaflet: ['leaflet']
        },
        entryFileNames: `app.js`,
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      },
      treeshake: true
    },
    target: 'esnext',
    minify: true,
    sourcemap: true
  },
})