import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import postcssNesting from 'postcss-nesting';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [postcssNesting]
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        devel: fileURLToPath(new URL('devel/index.html', import.meta.url))
      }
    }
  }
});
