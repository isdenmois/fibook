const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const strip = require('strip-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const ROOT_PATH = path.join(__dirname, '..');
const APP_PATH = `${ROOT_PATH}/src`;

module.exports = {
    context: APP_PATH,
    entry: `${APP_PATH}/main`,
    output: {
        path: `${ ROOT_PATH }/build`,
        publicPath: '/public/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /(node_modules|workers)/,
            },
            {
                test: /\.js$/,
                use: [
                    'webworker-loader',
                    strip.loader('debug'),
                    'babel-loader',
                ],
                include: /workers/,
                exclude: /workers\/tests/,
            },
            {
                test: /\.jsx?$/,
                use: [
                    strip.loader('debug'),
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader',
                }),
                include: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?importLoaders=1&modules&localIdentName=[hash:base64:5]&camelCase',
                }),
                include: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        'css-loader?importLoaders=1&modules&localIdentName=[hash:base64:5]&camelCase',
                        'sass-loader'
                    ],
                }),
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${APP_PATH}/index.html`,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin({
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
            },
            output: {
                ascii_only: true,
                comments: false
            },
            sourceMap: false,
            test: /vendors\.js/,
        }),
        new BabiliPlugin({
            test: /(main|worker).js$/,
            comments: false,
        }),
        new ExtractTextPlugin({
            allChunks: true,
            filename: '[name].css',
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: isExternal,
        }),
    ],
};
function isExternal(module) {
    const  userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('node_modules') >= 0;
}
