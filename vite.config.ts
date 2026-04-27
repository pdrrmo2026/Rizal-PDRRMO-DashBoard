import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Ensure assets are output to /assets with hashed filenames for cache busting
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // Split vendor chunks so the main bundle stays small
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "leaflet-vendor": ["leaflet", "react-leaflet"],
          "recharts-vendor": ["recharts"],
        },
      },
    },
  },
});
