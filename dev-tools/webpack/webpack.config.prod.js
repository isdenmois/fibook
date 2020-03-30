const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const strip = require('strip-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ShakePlugin = require('webpack-common-shake').Plugin
const TerserPlugin = require('terser-webpack-plugin')
const ROOT_PATH = path.join(__dirname, '../..')
const APP_PATH = ROOT_PATH + '/src'

const conf = {
  context: APP_PATH,
  mode: 'production',
  entry: APP_PATH + '/main',
  devtool: false,
  stats: {
    children: false,
  },
  output: {
    path: ROOT_PATH + '/build',
    publicPath: '/public/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    modules: ['src', 'node_modules'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [strip.loader('debug'), 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.graphql$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
      {
        test: /\.css$/,
        use: {
          loader: MiniCssExtractPlugin.loader,
        },
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: 'css-loader'
        // }),
        include: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [

        //   ]
        // }),
        include: /src/,
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_PATH + '/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    // new ExtractTextPlugin({
    //   allChunks: true,
    //   filename: '[name].css'
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new ShakePlugin(),
  ],
}

if (process.env.ANALYZE) {
  conf.plugins.push(
    new BundleAnalyzerPlugin({
      defaultSizes: 'gzip',
    }),
  )
}

module.exports = conf
