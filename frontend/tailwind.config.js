import animations from "@midudev/tailwind-animations";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [animations],
};
