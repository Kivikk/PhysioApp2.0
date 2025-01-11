import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'PhysioApp',
      short_name: 'PhysioApp',
      description: 'PhysioApp - Your digital physiotherapy exercise companion with offline support',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'physioapp.svg',
          sizes: '64x64 192x192 512x512',
          type: 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: 'physioapp.svg',
          sizes: '512x512',
          type: 'image/svg+xml',
          purpose: 'maskable'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})