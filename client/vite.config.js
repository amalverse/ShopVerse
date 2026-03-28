import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import compression from "vite-plugin-compression";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["fav-icon.png", "pwa-192x192.png", "pwa-512x512.png", "maskable-icon.png"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-cache",
            },
          },
        ],
      },
      manifest: {
        name: "ShopVerse - Premium E-Commerce",
        short_name: "ShopVerse",
        description: "Your ultimate destination for fashion, electronics, and lifestyle products.",
        theme_color: "#0f172a", // slate-900 (matches brand)
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/maskable-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const normalizedId = id.replace(/\\/g, "/");
            // Group React core and key libs together to prevent initialization issues in React 19
            if (
              normalizedId.includes("/react/") ||
              normalizedId.includes("/react-dom/") ||
              normalizedId.includes("/scheduler/") ||
              normalizedId.includes("/react-is/") ||
              normalizedId.includes("framer-motion") ||
              normalizedId.includes("react-router") ||
              normalizedId.includes("react-redux") ||
              normalizedId.includes("@reduxjs/toolkit")
            ) {
              return "vendor-react";
            }
            if (normalizedId.includes("stripe")) return "vendor-stripe";
            if (normalizedId.includes("swiper")) return "vendor-swiper";
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optional: increase limit to 1000kb if needed
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
  },
});

