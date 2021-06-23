import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'production',
  entry: {
    popup: './src/popup.tsx',
    background: './src/background.ts',
    options: './src/options.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/options.html',
      filename: 'options.html',
      chunks: ['options'],
    }),
    new CopyPlugin({
      patterns: ['manifest.json', { from: 'images', to: 'images' }],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CleanWebpackPlugin(),
  ],
};

export default config;
