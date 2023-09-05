import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import viteCompression from "vite-plugin-compression";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), viteCompression(), tsconfigPaths()],
});
