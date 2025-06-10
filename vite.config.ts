import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // -------------------------------------------------------------------
      // Basic PWA configuration
      // -------------------------------------------------------------------
      registerType: 'autoUpdate', // 'autoUpdate' will automatically update the service worker
      // 'prompt' will prompt the user for an update

      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // Assets to be precached

      manifest: {
        name: 'My Awesome Vue PWA',
        short_name: 'VuePWA',
        description: 'A great PWA built with Vue and Vite',
        theme_color: '#ffffff', // Theme color for the browser UI
        background_color: '#ffffff', // Background color for the splash screen
        display: 'standalone', // How the app is displayed (standalone, fullscreen, browser)
        start_url: '/', // The URL launched when the PWA is opened
        icons: [
          {
            src: 'pwa-192x192.png', // Relative path from the public folder
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable', // For Android adaptive icons
          },
        ],
      },

      // -------------------------------------------------------------------
      // Service Worker Caching (Workbox configuration)
      // -------------------------------------------------------------------
      workbox: {
        // runtimeCaching allows you to define strategies for network requests
        // that are not part of the precache manifest.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://api.yourdomain.com', // Replace with your API URL
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-data-cache',
              expiration: {
                maxEntries: 50,
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache opaque responses and successful ones
              },
            },
          },
          // Add more caching strategies as needed for your assets
        ],
      },

      // -------------------------------------------------------------------
      // Advanced options (optional)
      // -------------------------------------------------------------------
      devOptions: {
        enabled: true, // Enable PWA in development (useful for testing)
      },
      // injectRegister: 'auto', // Inject the service worker registration code (default)
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
