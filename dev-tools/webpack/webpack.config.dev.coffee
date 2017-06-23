path = require('path')
webpack = require('webpack')
HtmlWebpackPlugin = require('html-webpack-plugin')
AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
ExtractTextPlugin = require('extract-text-webpack-plugin')
fs = require('fs')

ROOT_PATH = path.join(__dirname, '../..')
APP_PATH = "#{ROOT_PATH}/src"

## DLL
dllConfig = require('./config').dllPlugin
dllPath = path.resolve(process.cwd(), dllConfig.path)
manifestPath = path.resolve(dllPath, 'fibookDeps.json')
dllDepPath = path.resolve(dllPath, 'fibookDeps.dll.js')

exports.context = APP_PATH
exports.devtool = 'source-map'

exports.entry = [
    'webpack-hot-middleware/client'
    "#{APP_PATH}/main"
]

exports.output =
    path: "#{ROOT_PATH}/build"
    filename: 'bundle.js'
    publicPath: '/'

exports.resolve =
    extensions: ['.js', '.jsx', '.ts', '.tsx']
    modules: ['src', 'node_modules']

exports.module =
    rules: [
        (
            test: /\.tsx?$/
            use: 'ts-loader'
            exclude: /node_modules/
        )
        (
            test: /\.(png|woff|woff2|eot|ttf)$/
            loader: 'url-loader'
            options: (limit: 100000)
        )
        (
            test: /\.svg$/
            use: 'svg-inline-loader'
        )
        (
            test: /\.css$/
            use: ExtractTextPlugin.extract(
                fallback: 'style-loader'
                use: 'css-loader'
            ),
            include: /node_modules/
        )
        (
            test: /\.css$/
            use: [
                'style-loader'
                'css-loader?importLoaders=1&localIdentName=[path][name]--[local]&camelCase&modules&sourceMap'
                'postcss-loader'
            ]
            include: /src/
        )
        (
            test: /\.json$/
            use: 'json-loader'
        )
    ]

exports.plugins = [
    new webpack.HotModuleReplacementPlugin()
    new webpack.DefinePlugin(
        'process.env.NODE_ENV': JSON.stringify('development')
    )
    new HtmlWebpackPlugin(
        template: "#{APP_PATH}/index.html"
    )
    new AddAssetHtmlPlugin(
        filepath: dllDepPath
        includeSourcemap: false
    )
    new webpack.DllReferencePlugin(
        context: process.cwd()
        manifest: require(manifestPath)
    )
    new ExtractTextPlugin(
        allChunks: true
        filename: '[name].css'
    )
]
