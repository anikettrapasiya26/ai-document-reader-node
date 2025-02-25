/* eslint-disable @typescript-eslint/no-var-requires */
const { readdirSync } = require('fs');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const ENTITIES_BUILD_DIR = path.resolve('dist/entities');
const ENTITIES_PATH = path.resolve('src/db/entities');
const ENTITIES_ENTRY_POINTS = readdirSync(ENTITIES_PATH)
  .filter((file) => file.endsWith('.entity.ts'))
  .reduce((entries, file) => {
    entries[file.slice(0, file.indexOf(path.extname(file)))] = path.join(
      ENTITIES_PATH,
      file,
    );
    return entries;
  }, {});

const OUTPUT_CONFIG = {
  path: ENTITIES_BUILD_DIR,
  filename: '[name].js',
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
  exclude: /node_modules/,
  loader: 'ts-loader',
};
const ENTITIES_CONFIG = {
  devtool: 'eval',
  entry: ENTITIES_ENTRY_POINTS,
  resolve: { extensions: ['.ts', '.d.ts'] },
  output: OUTPUT_CONFIG,
  module: { rules: [ESLINT_LOADER_RULE, TS_LOADER_RULE] },
  target: 'node',
  externals: [webpackNodeExternals()],
};

module.exports = ENTITIES_CONFIG;
