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
      '@': '/src',
      '@scss': '/external/scss', // Alias for the symbolic link to the SCSS folder
      '@css': '/external/css',   // Alias for the symbolic link to the CSS folder
    },
  },
  base: "http://localhost:5173/",
  server: {
    watch: {
      followSymlinks: true // Watch to symbolic links
    }
  },
  build: {
    outDir: "../../static/js/vue/",
  rollupOptions: {
    output: {
      // manualChunks: {
      //   vue: ['vue', 'vue-router'],
      //   showdown: ['showdown'],
      //   keycloak: ['keycloak-js'],
      //   leaflet: ['leaflet']
      // },
      entryFileNames: `app.js`,
      chunkFileNames: '[name].js',
      assetFileNames: '[name].[ext]'
    },
    treeshake: true
  },
  cssCodeSplit: true, // Ensure CSS is split into a separate file
  target: 'esnext',
  minify: true,
  sourcemap: true
  },
})