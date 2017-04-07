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
        extensions: ['.js', '.jsx'],
        modules: ['src', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                use: 'eslint-loader',
                exclude: /(node_modules|workers)/,
            },
            {
                test: /\.js$/,
                use: [
                    'worker-loader',
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
                test: /\.(png|woff|woff2|eot|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
                include: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?importLoaders=1&localIdentName=[hash:base64:5]&camelCase&modules',
                        'postcss-loader',
                    ],
                }),
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
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                dead_code: true,
                drop_console: true,
                drop_debugger: true,
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused        : true,
            },
            output: {
                comments: false
            },
            comments: false,
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
