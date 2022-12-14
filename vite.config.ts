import solidPlugin from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'
import devtools from 'solid-devtools/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    solidPlugin(),
    solidSvg({ defaultAsComponent: true }),
    devtools({ name: true, componentLocation: true }),
  ],
  server: {
    port: 4000,
  },
  build: {
    target: 'esnext',
  },
});