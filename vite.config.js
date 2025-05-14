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
  }
});
