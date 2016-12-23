/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const resolve = require('path').resolve;
const fs = require('fs');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        resolve(process.cwd(), 'app/app.js'), // Start with js/app.js
    ],

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: resolve(process.cwd(), 'build'),
        publicPath: '/',
    },

    // Add development plugins
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve(process.cwd(), 'app/index.html'),
        }),
    ],
    // Emit a source map for easier debugging
    devtool: 'cheap-module-eval-source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/, // Transform all .js files required somewhere with Babel
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react-hmre', "react", require('../internal/babel/develop')],
                },
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file',
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file',
            },
        ],
    },
    resolve: {
        modules: ['app', 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ],
    },
    target: 'web',
};
