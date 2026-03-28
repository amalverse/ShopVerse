import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Keep React core and its dependencies together to prevent Activity/initialization issues
            if (id.includes("react") || id.includes("scheduler")) {
              return "vendor-react-core";
            }
            // Isolate libraries that often cause cycles during default chunking
            if (id.includes("framer-motion")) return "vendor-framer";
            if (id.includes("swiper")) return "vendor-swiper";
            if (id.includes("react-icons")) return "vendor-icons";
            
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});

