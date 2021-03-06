import * as path from 'path';
import * as webpack from 'webpack';
const slsw = require('serverless-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config: webpack.Configuration = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  devtool: 'source-map',
  target: 'node',
  stats: 'minimal',
  entry: Object.keys(slsw.lib.entries).reduce(
    (entries: { [x: string]: any }, key) => {
      entries[key] = ['./source-map-install.js', slsw.lib.entries[key]];
      return entries;
    },
    {},
  ),
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};

export default config;
