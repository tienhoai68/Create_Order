import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 3000,
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
