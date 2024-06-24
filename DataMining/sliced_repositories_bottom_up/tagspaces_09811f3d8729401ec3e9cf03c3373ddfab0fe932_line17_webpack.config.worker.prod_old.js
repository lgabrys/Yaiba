N
o
 
l
i
n
e
s
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
export default merge.smart(baseConfig, {
  devtool: 'source-map',
  target: 'electron-renderer',
  entry: ['babel-polyfill', './app/splash-worker.js'],
});
