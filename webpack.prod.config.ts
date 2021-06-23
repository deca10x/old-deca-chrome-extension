import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { merge } from 'webpack-merge';

import { commonConfig } from './webpack.config';

const config = merge<webpack.Configuration>(commonConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: ['manifest.json', { from: 'images', to: 'images' }],
    }),
    new CleanWebpackPlugin(),
  ],
});

export default config;
