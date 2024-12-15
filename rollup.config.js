import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

const packageJson = require('./package.json');

const isEnvProduction = process.env.NODE_ENV === 'production';

export default [
    {
        external: [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.peerDependencies)],
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
        watch: {
            chokidar: true,
            clearScreen: true,
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: isEnvProduction ? './tsconfig.prod.json' : './tsconfig.json' }),
            isEnvProduction && terser(),
        ].filter(Boolean),
    },
    {
        input: 'dist/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [
            dts(),
            isEnvProduction &&
                del({
                    targets: 'dist/types',
                    verbose: false,
                    hook: 'buildEnd',
                    force: true,
                }),
        ].filter(Boolean),
    },
];
