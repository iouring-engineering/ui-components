import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import packageJson from "./package.json" assert { type: "json" };
import replace from "@rollup/plugin-replace";
import generatePackageJson from "rollup-plugin-generate-package-json";
import fs from "fs"
import path from "path"

const IGNORED_DIRECTORIES = ["assets"]

function getFoldersInDirectory(directoryPath) {
    try {
        const folderNames = fs.readdirSync(directoryPath);
        const folders = folderNames.filter((name) => {
            if (IGNORED_DIRECTORIES.includes(name)) {
                return false
            }
            const fullPath = `${directoryPath}/${name}`;
            return fs.statSync(fullPath).isDirectory();
        });
        return folders;
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}

const plugins = [
    peerDepsExternal(),
    resolve(),
    replace({
        __IS_DEV__: process.env.NODE_ENV === "development",
    }),
    commonjs(),
    postcss(),
    terser(),
];

const subfolderPlugins = (folderName) => [
    ...plugins,
    typescript({
        tsconfig: './tsconfig.json',
        declaration: false
    }),
    generatePackageJson({
        baseContents: {
            name: `${packageJson.name}/${folderName}`,
            private: true,
            main: "./index.cjs.js", // --> points to cjs format entry point of whole library
            module: "./index.js", // --> points to esm format entry point of individual component
            types: "./index.d.ts", // --> points to types definition file of individual component
        },
    }),
];

const folderBuilds = getFoldersInDirectory('src').map((folder) => {
    return {
        input: `src/${folder}/index.ts`,
        output: [
            {
                file: `lib/${folder}/index.js`,
                sourcemap: false,
                exports: 'named',
                format: 'esm',
            },
            {
                file: `lib/${folder}/index.cjs.js`,
                sourcemap: false,
                exports: 'named',
                format: 'cjs',
            }
        ],
        plugins: subfolderPlugins(folder),
        external: ['react', 'react-dom'],
    };
});

function addPackageJson() {
    const packageFile = `{
    "name": "@iouring-engineering/ui-components",
    "version": "${packageJson.version}",
    "description": "React UI Components",
    "private": false,
    "author": "Devika Das",
    "homepage": "https://iouring.com/",
    "repository": {
        "type": "git",
        "url": "https://github.com/iouring-engineering/ui-components"
    },
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/iouring-engineering/ui-components/issues"
    },
    "keywords": [
        "ui components",
        "react ui components",
        "heatmap",
        "react heatmap",
        "market heatmap"
    ],
    "main": "index.js",
    "module": "index.esm.js",
    "types": "index.d.ts",
    "peerDependencies": {
        "@mui/material": ">=5.13.4",
        "react": ">=17.0.2",
        "react-dom": ">=17.0.2"
    }
}`;

    !fs.existsSync("lib/") && fs.mkdirSync("lib/");
    fs.writeFileSync(path.resolve("lib/", 'package.json'), packageFile);
}

addPackageJson()

export default [
    {
        input: ["src/index.ts"],
        output: [
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: false,
                exports: "named",
            },
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: false,
                exports: "named",
            },
        ],
        plugins: [
            ...plugins,
            typescript({
                tsconfig: './tsconfig.json',
                declaration: true,
                declarationDir: "lib"
            })
        ],
        external: ["react", "react-dom"],
    },
    ...folderBuilds,
];
