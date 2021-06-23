import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

interface Configuration extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration;
}

const config: Configuration = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  entry: './src/popup.tsx',
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
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },
};

export default config;
