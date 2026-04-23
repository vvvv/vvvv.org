import { defineConfig, searchForWorkspaceRoot  } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        path.resolve(__dirname, '../frontend/src'), // Explicitly allow access to the frontend/src directory
      ],
    },
  },
  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, '../frontend/src'), // Alias for frontend/src
    },
  },
});
