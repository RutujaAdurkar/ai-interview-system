// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({

  plugins: [

    react(),

    VitePWA({

      registerType: 'autoUpdate',

      manifest: {

        name: 'InterviewIQ AI',

        short_name: 'InterviewIQ',

        description:
          'AI Interview Platform',

        theme_color: '#0f172a',

        background_color: '#0f172a',

        display: 'standalone',

        orientation: 'portrait',

        scope: '/',

        start_url: '/',

        icons: [

          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },

          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          }

        ]

      }

    })

  ]

})