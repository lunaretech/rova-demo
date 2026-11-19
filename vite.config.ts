import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// `base: "./"` deixa o site funcionar em qualquer caminho (GitHub Pages serve em /<repo>/).
export default defineConfig({ base: "./", plugins: [react()] });
