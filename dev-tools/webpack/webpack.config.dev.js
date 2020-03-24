const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ROOT_PATH = path.join(__dirname, '../..')
const APP_PATH = ROOT_PATH + '/src'

exports.context = APP_PATH

exports.devtool = 'source-map'

exports.mode = 'development'

exports.entry = ['webpack-hot-middleware/client', APP_PATH + '/main']

exports.output = {
  devtoolModuleFilenameTemplate: '/[resource-path]',
  path: ROOT_PATH + '/build',
  filename: 'bundle.js',
  publicPath: '/',
  globalObject: 'this',
}

exports.resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  modules: ['src', 'node_modules'],
}

exports.module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'babel-loader',
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
      use: MiniCssExtractPlugin.loader,
      //   options
      //   ({
      //     fallback: 'style-loader',
      //     use: 'css-loader'
      //   }),
      include: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localsConvention: 'camelCase',
            modules: {
              localIdentName: '[path][name]__[local]',
            },
            sourceMap: true,
          },
        },
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
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  new HtmlWebpackPlugin({
    template: APP_PATH + '/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
]
