import path from 'path'
import { existsSync } from 'fs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import eslint from '@rbnlffl/rollup-plugin-eslint'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

const extensions = ['.ts', '.js', '.tsx', '.jsx']
const babelOptions = {
  // rootMode: 'upward',
  extensions,
  babelHelpers: 'bundled',
}
const index = extensions.findIndex(ext => existsSync(`./src/index${ext}`))
const input = `./src/index${extensions[index]}`

const paths = {
  input,
  output: path.join(__dirname, './lib'),
  tsconfig: path.join(__dirname, './tsconfig.json'),
}

export default {
  input: paths.input, // build input
  output: [
    // output commonjs
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.name,
    },
    // output es
    {
      file: pkg.module,
      format: 'es',
      name: pkg.name,
    },
  ],
  plugins: [
    eslint({
      throwOnError: true, // lint 结果有错误将会抛出异常
      throwOnWarning: true,
      filterInclude: ['src/**/*.ts'],
      filterExclude: ['node_modules/**', 'lib/**', '*.js'],
    }),
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: path.tsconfig,
    }),
    babel({
      ...babelOptions,
      plugins: [
        [
          'babel-plugin-transform-rename-import',
          {
            replacements: [],
          },
        ],
      ],
    }),
  ],
}
