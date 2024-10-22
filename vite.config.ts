/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    // you might also want:
    // css: true,
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
  },
});
