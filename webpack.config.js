var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');

var extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  entry: {
    app: './src/js/app.js',
    bootstrap: bootstrapEntryPoints.dev
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js',
    // publicPath: '/dist',
    // chunkFilename: '[id].[chunkhash].js'
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?minimize'
        })
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.pug$/,
        use: ['pug-html-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }]
      },
      {
        test: /\.(woff2?|svg)$/,
        use: [{
          loader: 'url-loader?limit=10000',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/svg/',
            publicPath: 'img/svg/'
          }
        }]        
      },
      {
        test: /\.(ttf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.gif$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/gifs/',
            publicPath: 'img/gifs/'
          }
        }]
      },
      {
        test: /\.ico$/,
        loader: 'url-loader',
        query: { 
          limit: 1,
          name: '[name].[ext]',
        },
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 4200,
    host: '0.0.0.0',
    hot: false,
    quiet: false
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      allChunks: false
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: 'popper.js/dist/umd/popper.js',
      Tether: 'tether',
      'window.Tether': 'tether',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    })
  ]
};