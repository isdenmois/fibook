const config = (function() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return require('./webpack.config.prod')
    case 'test':
      return require('./webpack.config.test')
    default:
      return require('./webpack.config.dev')
  }
})()

const path = require('path')
const webpack = require('webpack')
const compiler = webpack(config)

middleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  silent: true,
})

module.exports = function(app) {
  app.use(middleware)
  app.use(require('webpack-hot-middleware')(compiler))
  const fs = middleware.fileSystem
  return app.get('*', function(req, res) {
    return fs.readFile(path.join(compiler.outputPath, 'index.html'), function(err, file) {
      if (err) {
        return res.sendStatus(404)
      } else {
        return res.send(file.toString())
      }
    })
  })
}
