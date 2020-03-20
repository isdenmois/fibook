const join = require('path').join
const webpack = require('webpack')
const pullAll = require('lodash/pullAll')
const uniq = require('lodash/uniq')
const dllConfig = require('./config').dllPlugin

const outputPath = join(process.cwd(), dllConfig.path)
const pkg = require(join(process.cwd(), 'package.json'))
const dependencyNames = Object.keys(pkg.dependencies)
const includeDependencies = uniq(dependencyNames.concat(dllConfig.include))
const entry = {
  fibookDeps: pullAll(includeDependencies, dllConfig.exclude),
}

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
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
}
