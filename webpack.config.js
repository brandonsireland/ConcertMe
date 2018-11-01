const path = require('path');
require("babel-register");
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: { main: './src/app.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }

        ]
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './src/assets',
              emitFile: false,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin({
      filename: 'main.css',
      // filename: 'style.[contenthash].css'
    }),
    // new WebpackMd5Hash(),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   hash: true,
    //   template: './views/index.hbs',
    //   filename: 'index.hbs'
    // })
  ],
  watch: true,
  devtool: 'source-map',
};

module.exports = config;