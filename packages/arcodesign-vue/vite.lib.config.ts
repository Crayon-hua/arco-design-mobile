import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@arco-design/mobile-utils/style': path.resolve(
                __dirname,
                '../common-widgets/style',
            ),
        },
    },
    css: {
        preprocessorOptions: {
            less: { javascriptEnabled: true, modifyVars: { '@use-css-vars': 1 } },
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'library.ts'),
            formats: ['es', 'cjs'],
            fileName: format => (format === 'es' ? 'index.mjs' : 'index.cjs'),
        },
        rollupOptions: {
            external: ['vue', '@arco-design/mobile-utils', 'lodash.throttle'],
            output: { assetFileNames: 'style[extname]', exports: 'named' },
        },
    },
});
