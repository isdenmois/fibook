const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const strip = require('strip-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.join(__dirname, '..');
const APP_PATH = `${ROOT_PATH}/src`;

module.exports = {
    entry: `${APP_PATH}/main`,
    output: {
        path: `${ ROOT_PATH }/build`,
        publicPath: '/',
        filename: 'bundle-[hash].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint',
                exclude: /node_modules/,
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [strip.loader('debug'), 'babel?presets=es2015'],
                exclude: /node_modules/,
            },
            {
                test: /workers\/(.*)\.js$/,
                loaders: ['webworker', strip.loader('debug'), 'babel'],
                exclude: /workers\/tests/,
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?camelCase&modules!sass'),
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json',
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: `${APP_PATH}/index.html`
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            },
            output: {
                ascii_only: true,
                comments: false
            }
        }),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    ],
};
