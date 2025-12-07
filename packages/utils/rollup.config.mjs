import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = path.resolve(__dirname, 'src/index.ts');
const tsconfig = path.resolve(__dirname, 'tsconfig.json');

export default defineConfig({
  input,
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/cjs/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.js']
    }),
    commonjs(),
    typescript({
      tsconfig,
      declaration: true,
      declarationDir: 'dist/types'
    })
  ],
  treeshake: 'recommended'
});
