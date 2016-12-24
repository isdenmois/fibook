const config = require('./webpack.config.dev');
const webpack = require('webpack');

const compiler = webpack(config);
const path = require('path');
const middleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    silent: true,
});

module.exports = function setup(app) {
    app.use(middleware);

    app.use(require('webpack-hot-middleware')(compiler));

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
        fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send(file.toString());
            }
        });
    });
};
