import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: 'auto',

    pwaAssets: {
      disabled: false,
      config: true,
      process: {     // Debug-Log hinzufügen
        onProcessAssetManifest: (manifest) => {
          console.log('Processing asset manifest:', manifest);
          return manifest;
        }
      }
    },

    manifest: {
      name: 'PhysioApp',
      short_name: 'PhysioApp',
      description: 'PhysioApp - Your digital physiotherapy exercise companion with offline support',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'favicon.ico',
          sizes: '48x48',
          type: 'image/x-icon'
        },
        {
          src: 'favicon.svg',
          sizes: '64x64 192x192 512x512',
          type: 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
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