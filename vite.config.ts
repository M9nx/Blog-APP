import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.tsx',
                'resources/js/react-app.tsx',
                'resources/js/test-app.jsx',
                // 'resources/js/debug.js', // Removed debug script
                'resources/js/test-component.tsx',
                'resources/js/simple-app.tsx'
            ],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: [],
                babelrc: false,
                configFile: false,
            }
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
});
