path = require('path')
webpack = require('webpack')
HtmlWebpackPlugin = require('html-webpack-plugin')
strip = require('strip-loader')
ExtractTextPlugin = require('extract-text-webpack-plugin')
OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
BabiliPlugin = require('babili-webpack-plugin')
{BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
ShakePlugin = require('webpack-common-shake').Plugin
TerserPlugin = require('terser-webpack-plugin')

ROOT_PATH = path.join(__dirname, '../..')
APP_PATH = "#{ROOT_PATH}/src"


isExternal = (module) ->
    userRequest = module.userRequest

    if typeof userRequest != 'string'
        return false

    return userRequest.indexOf('node_modules') >= 0


conf =
    context: APP_PATH
    entry: "#{APP_PATH}/main"
    stats:
        children: false
    output:
        path: "#{ ROOT_PATH }/build"
        publicPath: '/public/'
        filename: '[name].js'
    resolve:
        extensions: ['.js', '.jsx', '.ts', '.tsx']
        modules: ['src', 'node_modules']
        alias:
            react: 'preact-compat'
            'react-dom': 'preact-compat'
    module:
        rules: [
            (
                test: /\.tsx?$/
                use: [strip.loader('debug'), 'ts-loader']
                exclude: /node_modules/
            )
            (
                test: /\.(png|woff|woff2|eot|ttf)$/
                loader: 'url-loader'
                options:
                    limit: 100000
            )
            (
                test: /\.css$/
                use: ExtractTextPlugin.extract(
                    fallback: 'style-loader'
                    use: 'css-loader'
                )
                include: /node_modules/
            )
            (
                test: /\.css$/
                use: ExtractTextPlugin.extract(
                    fallback: 'style-loader'
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                localIdentName: '[hash:base64:5]',
                                camelCase: true,
                                modules: true
                            }
                        }
                        'postcss-loader'
                    ]
                )
                include: /src/
            )
            (
                test: /\.json$/
                use: 'json-loader'
            )
            (
                test: /\.svg$/
                use: 'svg-inline-loader'
            )
        ]
    optimization:
        minimizer: [
            new TerserPlugin(
                cache: true,
                parallel: true
                sourceMap: true # Must be set to true if using source-maps in production
                terserOptions: {
                    # https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            )
        ]
        splitChunks:
            cacheGroups:
                vendor:
                    test: /[\\/]node_modules[\\/]/
                    name: 'vendors'
                    chunks: 'all'
    plugins: [
        new HtmlWebpackPlugin(
            template: "#{APP_PATH}/index.html"
            minify:
                collapseWhitespace: true
                removeComments: true
                removeRedundantAttributes: true
                removeScriptTypeAttributes: true
        )
        new webpack.DefinePlugin('process.env.NODE_ENV': JSON.stringify('production'))
        new webpack.LoaderOptionsPlugin(
            minimize: true
            debug: false
        )
        # new webpack.optimize.UglifyJsPlugin(
        #     beautify: false
        #     mangle:
        #         screw_ie8: true
        #         keep_fnames: true
        #     compress:
        #         warnings: false
        #         dead_code: true
        #         drop_console: true
        #         drop_debugger: true
        #         sequences     : true
        #         booleans      : true
        #         loops         : true
        #         unused        : true
        #     output:
        #         comments: false
        #     comments: false
        #     sourceMap: false
        #     test: /vendors\.js/
        # )
        # new BabiliPlugin({},
        #     test: /(main|worker)\.js$/
        #     comments: false
        #     sourceMap: false
        # )
        new ExtractTextPlugin(
            allChunks: true
            filename: '[name].css'
        )
        new OptimizeCssAssetsPlugin()
        new ShakePlugin()
    ]

if process.env.ANALYZE
    conf.plugins.push(new BundleAnalyzerPlugin(defaultSizes: 'gzip'))

module.exports = conf
