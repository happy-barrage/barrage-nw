var path = require('path');
var webpack = require('webpack');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var config = {
  entry : {
    menu : path.resolve(__dirname, 'src/menu')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  resolve: {

    alias : {
      //fix react
      'react/lib': nodeModulesPath + 'react/lib',
      'react' : nodeModulesPath + '/react/dist/react.min.js'
    }

  },

  plugins: [
    new webpack.DefinePlugin({
      '__ENV__': JSON.stringify('production')
    }),

    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),


    new webpack.PrefetchPlugin('react'),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?stage=0'],//if use babel promise feature etc..?optional[]=runtime
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer?browsers=last 2 version', 'sass']
      },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=100000' }
    ],

    noParse: ['react']
  }
};

module.exports = config;