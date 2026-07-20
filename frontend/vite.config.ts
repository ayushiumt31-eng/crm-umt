import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase from default 500 kB to 1000 kB
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor libraries into separate chunks
          if (id.includes("node_modules/react")) return "react";
          if (id.includes("node_modules/@radix-ui")) return "ui";
          if (id.includes("node_modules/react-hook-form") || id.includes("node_modules/zod")) return "form";
          if (id.includes("node_modules/lucide-react")) return "icons";
        },
      },
    },
  },
});