import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    define: { 'process.env': {} },
    build: { ourdir: 'dist', sourcemap: false },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
    }
});