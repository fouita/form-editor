import path from "path"
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    emitCss: false,
    onwarn: (warning, handler) => {
      if (warning.code.startsWith('a11y-')) {
        return;
      }
      handler(warning);
    },
  }), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'FormEditor',
      fileName: (format) => `form-builder.${format}.js`
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  }
})
