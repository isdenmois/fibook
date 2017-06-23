###
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
###

{join} = require('path')
webpack = require('webpack')
pullAll = require('lodash/pullAll')
uniq = require('lodash/uniq')

dllConfig = require('./config').dllPlugin
outputPath = join(process.cwd(), dllConfig.path)
pkg = require(join(process.cwd(), 'package.json'))

dependencyNames = Object.keys(pkg.dependencies)
includeDependencies = uniq(dependencyNames.concat(dllConfig.include))
entry =
    fibookDeps: pullAll(includeDependencies, dllConfig.exclude),


module.exports =
    context: process.cwd()
    entry: entry
    devtool: 'eval'
    output:
        filename: '[name].dll.js'
        path: outputPath
        library: '[name]'
        publicPath: '/'

    plugins: [
        new webpack.DllPlugin(
            name: '[name]'
            path: join(outputPath, '[name].json')
        )
        new webpack.DefinePlugin(
            'process.env':
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        )
        new webpack.NamedModulesPlugin()
    ]

    resolve:
        extensions: ['.js']

    target: 'web'

    module:
        rules: [
            (
                test: /\.json$/
                use: 'json-loader'
            )
        ]
