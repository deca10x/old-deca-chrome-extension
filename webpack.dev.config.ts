import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import { merge } from 'webpack-merge';

import { commonConfig } from './webpack.config';

interface Configuration extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration;
}

const config = merge<Configuration>(commonConfig, {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 4000,
    open: true,
    openPage: ['options.html'],
  },
});

export default config;
