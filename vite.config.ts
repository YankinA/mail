import solidPlugin from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'
import { defineConfig } from 'vite'
import devtools from 'solid-devtools/vite'

export default defineConfig({
  plugins: [
    devtools({ name: true, componentLocation: true }),
    solidPlugin(),
    solidSvg()
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
