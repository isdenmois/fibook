const path = require('path')
const webpack = require('webpack')
const strip = require('strip-loader')
const BabiliPlugin = require('babili-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ShakePlugin = require('webpack-common-shake').Plugin
const fs = require('fs')
const ROOT_PATH = path.join(__dirname, '../..')
const APP_PATH = ROOT_PATH + '/src'

function isExternal(module) {
  var userRequest
  userRequest = module.userRequest
  if (typeof userRequest !== 'string') {
    return false
  }
  return userRequest.indexOf('node_modules') >= 0
}

exports.context = APP_PATH

exports.entry = APP_PATH + '/main'

exports.output = {
  path: ROOT_PATH + '/build',
  publicPath: '/public/',
  filename: '[name].js',
}

exports.resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  modules: ['src', 'node_modules'],
}

exports.module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: [strip.loader('debug'), 'babel-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.(png|woff|woff2|eot|ttf)$/,
      loader: 'url-loader',
      options: {
        limit: 100000,
      },
    },
    {
      test: /\.svg$/,
      use: 'svg-inline-loader',
    },
    {
      test: /\.css$/,
      use: {
        loader: MiniCssExtractPlugin.loader,
      },
      // use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader"
      // }),
      include: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1&localIdentName=[path][name]--[local]&modules&sourceMap',
        'postcss-loader',
      ],
      include: /src/,
    },
    {
      test: /\.json$/,
      use: 'json-loader',
    },
  ],
}

exports.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new HtmlWebpackPlugin({
    template: APP_PATH + '/index.html',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  // new ExtractTextPlugin({
  //     allChunks: true,
  //     filename: "[name].css"
  // }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true,
    },
    compress: {
      warnings: false,
      dead_code: true,
      drop_console: true,
      drop_debugger: true,
      sequences: true,
      booleans: true,
      loops: true,
      unused: true,
    },
    output: {
      comments: false,
    },
    comments: false,
    sourceMap: false,
    test: /vendors\.js/,
  }),
  new BabiliPlugin(
    {},
    {
      test: /(main|worker)\.js$/,
      comments: false,
      sourceMap: false,
    },
  ),
  new OptimizeCssAssetsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    minChunks: isExternal,
  }),
  new ShakePlugin(),
]
