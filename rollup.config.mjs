import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { default as external, default as peerDepsExternal } from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import packageJson from "./package.json" assert { type: "json" };
import preserveDirectives from "rollup-plugin-preserve-directives";

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: false,
            banner: "'use client';"
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: false,
            banner: "'use client';"
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss(),
        terser(),
        preserveDirectives()
    ],
    external: ["react", "react-dom"]
}
