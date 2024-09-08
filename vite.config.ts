import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    viteStaticCopy({
      targets: [{ src: "src/assets/**/*", dest: "assets" }],
    }),
  ],
});
