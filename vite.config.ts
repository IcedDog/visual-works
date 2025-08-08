import { defineConfig } from 'vite'
import inject from '@rollup/plugin-inject';

export default defineConfig({
    base: '/visual-works/',
    plugins: [
        inject({
            p5: 'p5',
        }),
    ],
})