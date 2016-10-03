var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var cssnext = require('postcss-cssnext');
var nested = require('postcss-nested');
var postcssAssets = require('postcss-assets');

var colors = require('colors');

var postCSSConfig = function(webpack) {
  return [nested, cssnext(), postcssAssets()];
};

module.exports = {
  // devtool: 'cheap-eval-source-map',
  entry: './src/js/app.js',
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      // filename: path.resolve(__dirname, 'src', 'build', 'index.html'),
      template: path.resolve(__dirname, 'src', 'template', 'index.hbs'),
    }),
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css!postcss') },
      // { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.(ttf|eot|svg|ttf|otf|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader' },
      { test: /\.(jpg|png|gif)$/, loaders: ['file-loader', 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'] },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [
            path.join(__dirname, 'src', 'template'),
          ],
        },
      },
    ]
  },
  postcss: postCSSConfig
};
