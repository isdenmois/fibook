config = switch process.env.NODE_ENV
    when 'production' then require('./webpack.config.prod')
    when 'test' then require('./webpack.config.test')
    else require('./webpack.config.dev')

path = require('path')
webpack = require('webpack')

compiler = webpack(config)
middleware = require('webpack-dev-middleware')(compiler,
    noInfo: true
    publicPath: config.output.publicPath
    silent: true
)


module.exports = (app) ->
    app.use(middleware)

    app.use(require('webpack-hot-middleware')(compiler))

    fs = middleware.fileSystem
    app.get('*', (req, res) ->
        fs.readFile(
            path.join(compiler.outputPath, 'index.html'),
            (err, file) -> if err then res.sendStatus(404) else res.send(file.toString())
        )
    )
