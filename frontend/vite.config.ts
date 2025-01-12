import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig((configEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd(), "");
    const API = {
        target: env.VITE_TARGET,
        changeOrigin: true,
        ws: true,
        secure: true,
        headers: {
            cookie: "Authentication=" + env.VITE_COOKIE,
        },
    };
    return {
        plugins: [sveltekit()],
        server: {
            proxy: {
                "/api": API,
            },
        },
        resolve: {
            alias: {
                "@": "/src",
            },
        },
    };
});
