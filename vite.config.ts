import preact from "@preact/preset-vite";
import cssnano from "cssnano";
import postcssNested from "postcss-nested";
import postcssViewportFallback from "postcss-viewport-unit-fallback";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact(),
        tsconfigPaths(),
        visualizer({
            gzipSize: true,
            sourcemap: true,
            template: "sunburst",
        }),
    ],
    css: {
        postcss: {
            plugins: [
                postcssViewportFallback(),
                postcssNested,
                cssnano({
                    preset: "default",
                }),
            ],
        },
    },
    build: {
        cssMinify: false,
        sourcemap: true,
    },
});
