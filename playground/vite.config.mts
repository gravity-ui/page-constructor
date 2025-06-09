import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    optimizeDeps: {
        //workaround for the problem https://github.com/vitejs/vite/issues/7719
        extensions: ['.css'],
        esbuildOptions: {
            plugins: [
                (await import('esbuild-sass-plugin')).sassPlugin({
                    type: 'style',
                }),
            ],
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ['import', 'mixed-decls', 'global-builtin'],
            },
        },
    },
});
