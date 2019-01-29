var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  stats: {
    colors: true
  },
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              },
              },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|obj|mtl)$/,
        loader: 'url-loader',
        options: {
          limit: 19192
        }
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          inject: false,
          hash: true,
          template: './src/index.html',
          filename: 'index.html'
      }),
      new CopyWebpackPlugin([
          {from:'src/',to:'./'},
          {from:'src/warrior',to:'./warrior'},
          {from:'src/head',to:'./head'},
          {from:'src/castle',to:'./castle'}
      ])
  ]
};