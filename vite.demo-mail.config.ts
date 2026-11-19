import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds the email client demo (src/demo-mail) on its own, so that
// `make build-demo-mail` can publish it next to the e-commerce demo.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: path.resolve(__dirname, "src/demo-mail"),
  base: "./",
  // Only the favicon: the repository public/ folder holds the built sites
  publicDir: path.resolve(__dirname, "src/demo-mail/public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist-demo-mail"),
    emptyOutDir: true,
  },
});
