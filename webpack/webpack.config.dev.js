const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

const ROOT_PATH = path.join(__dirname, '..');
const APP_PATH = `${ROOT_PATH}/src`;

/**
 * DLL.
 */
const dllConfig = require('./config').dllPlugin;
const dllPath = path.resolve(process.cwd(), dllConfig.path);
const manifestPath = path.resolve(dllPath, 'fibookDeps.json');
const dllDepPath = path.resolve(dllPath, 'fibookDeps.dll.js');
if (!fs.existsSync(manifestPath)) {
    console.error('The DLL manifest is missing. Please run `npm run build:dll`');
    process.exit(0);
}

module.exports = {
    context: APP_PATH,
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        `${APP_PATH}/main`
    ],
    output: {
        path: `${ ROOT_PATH }/build`,
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['src', 'node_modules'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            template: `${APP_PATH}/index.html`,
        }),
        new AddAssetHtmlPlugin({
            filepath: dllDepPath,
            includeSourcemap: false,
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(manifestPath),
        }),
        new ExtractTextPlugin({
            allChunks: true,
            filename: '[name].css',
        }),
        new webpack.ProvidePlugin({
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|workers)/,
            },
            {
                test: /\.js$/,
                use: ['webworker-loader', 'babel-loader'],
                include: /workers/,
                exclude: /workers\/tests/,
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
                loader: 'svg-inline-loader',
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
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1&localIdentName=[hash:base64:5]&camelCase',
                    'sass-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1&localIdentName=[path]--[local]&camelCase&modules&sourceMap',
                    'postcss-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
        ]
    }
};
