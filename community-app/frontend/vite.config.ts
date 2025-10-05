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
    input: {
      main: './src/main.js'
    },
    output: {
      manualChunks: {
        vue: ['vue'],
        icons: ['@vicons/ionicons5'],
        lodash: ['lodash']
      },
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