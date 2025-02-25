/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const glob = require('glob');

const APP_BUILD_DIR = path.resolve('dist');
const APP_SRC_DIR = path.resolve();

const SWAGGER_FILES = glob.sync('**/api/**/*.swagger.json');

const OUTPUT_CONFIG = {
  path: APP_BUILD_DIR,
};

const ESLINT_LOADER_RULE = {
  test: /\.(ts|tsx)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        eslintPath: require.resolve('eslint'),
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  exclude: /node_modules/,
};

const TS_LOADER_RULE = {
  test: /\.tsx?$/,
  exclude: [/node_modules/, /dist/],
  include: [APP_SRC_DIR],
  loader: 'ts-loader',
};

const APP_CONFIG = {
  devtool: 'inline-source-map',
  entry: {
    app: ['./index.ts'],
    db: ['./src/tools/db.tool.ts'],
  },
  resolve: { extensions: ['.ts', '.d.ts', '.tsx', '.js'] },
  output: OUTPUT_CONFIG,
  module: { rules: [ESLINT_LOADER_RULE, TS_LOADER_RULE] },
  target: 'node',
  externals: [webpackNodeExternals()],
  plugins: [
    new MergeJsonWebpackPlugin({
      files: SWAGGER_FILES,
      output: {
        fileName: 'swagger.json',
      },
    }),
  ],
};

if (process.env.NODE_ENV !== 'production') {
  if (!APP_CONFIG.plugins) APP_CONFIG.plugins = [];
  APP_CONFIG.plugins.push(new NodemonPlugin({ watch: [] }));
}

module.exports = APP_CONFIG;
