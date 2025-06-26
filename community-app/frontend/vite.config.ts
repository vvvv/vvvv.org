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
  base: "./",
  server: {
    watch: {
      followSymlinks: true // Watch to symbolic links
    }
  },
  build: {
    outDir: "../../static/js/vue/",
  rollupOptions: {
    input: './src/main.js',
    output: {
      manualChunks(id) {
        if (id.includes('vue')) return 'vue';
        if (id.includes('vue-router')) return 'vue-router';
        if (id.includes('naive-ui')) return 'naive-ui';
        if (id.includes('node_modules')) return 'vendor';
        if (id.includes('pinia')) return 'pinia';
        if (id.includes('Business')) return 'business';
        if (id.includes('Edit')) return 'edit';
        if (id.includes('Edu')) return 'edu';
        if (id.includes('View')) return 'view';
        if (id.includes('List')) return 'list';
      },
      // manualChunks: {
      //   vue: ['vue', 'vue-router'],
      //   showdown: ['showdown'],
      //   keycloak: ['keycloak-js'],
      //   leaflet: ['leaflet']
      // },
      entryFileNames: `app.js`,
      chunkFileNames: 'app-[name]-[hash].js',
      assetFileNames: '[name].[ext]'
    },
    treeshake: true
  },
  // cssCodeSplit: true, // Ensure CSS is split into a separate file
  target: 'esnext',
  minify: true,
  sourcemap: false
  },
})