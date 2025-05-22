import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["6e76-149-22-86-12.ngrok-free.app"],
  },
  plugins: [react(), tailwindcss()],
});
