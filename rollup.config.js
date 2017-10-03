import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';
import { minify } from 'uglify-es';

const config = {
  input: 'src/index.js',
  name: 'stylex',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    json(),
  ],
  external: [],
  globals: {},
  output: {
    file: './index.js',
    format: 'umd',
  },
  banner: `/*! ${pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} Ryan Hefner | ${pkg.license} License | https://github.com/${pkg.repository} !*/`,
  footer: '/* follow me on Twitter! @ryanhefner */',
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify({}, minify));
}

export default config;
