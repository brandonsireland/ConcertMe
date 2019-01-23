const path = require('path');
require("babel-register");
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: { main: './src/app.js' },
  output: {
    path: path.resolve(__dirname, 'public/js/'),
    filename: 'bundle.js'
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
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/fonts',
              emitFile: true,
            }
          }
        ]
      },
      {
        test: /\.(jpe|jpg|png|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/img',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public/css', 'public/js'], {} ),
    new MiniCssExtractPlugin({
      filename: '../css/main.css',
    }),
    new WebpackMd5Hash()
  ],
  watch: true,
  devtool: 'source-map',
};

module.exports = config;