import * as path from 'path';
import * as webpack from 'webpack';
import * as slsw from 'serverless-webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

module.exports = {
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
} as webpack.Configuration;
