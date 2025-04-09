import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      // These options ensure that even if ESLint finds errors,
      // they won’t block the dev server.
      failOnError: false, // Do NOT fail the build on errors
      failOnWarning: false, // Do NOT fail the build on warnings
      // Optional: you might also turn off emitting errors so they only show as warnings
      emitError: false,
      emitWarning: true,
    }),
  ],
});
