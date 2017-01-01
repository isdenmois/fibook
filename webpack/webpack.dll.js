/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const { join } = require('path');
const webpack = require('webpack');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

const dllConfig = require('./config').dllPlugin;
const outputPath = join(process.cwd(), dllConfig.path);
const pkg = require(join(process.cwd(), 'package.json'));

const dependencyNames = Object.keys(pkg.dependencies);
const includeDependencies = uniq(dependencyNames.concat(dllConfig.include));
const entry = {
    fibookDeps: pullAll(includeDependencies, dllConfig.exclude),
};

module.exports = {
    context: process.cwd(),
    entry: entry,
    devtool: 'eval',
    output: {
        filename: '[name].dll.js',
        path: outputPath,
        library: '[name]',
        publicPath: '/',
    },
    plugins: [
        new webpack.DllPlugin({ name: '[name]', path: join(outputPath, '[name].json') }), // eslint-disable-line no-new
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.NamedModulesPlugin(),
    ],
    resolve: {
        extensions: ['', '.js']
    },
    target: 'web',
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json',
            },
        ]
    },
};
