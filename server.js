const express = require('express');
const logger = require('morgan');
const resolve = require('path').resolve;
const webpackMiddleware = require('./webpack/middleware');

const PORT = process.env.PORT || 4000;

const app = express();

/**
 * Use express logger.
 */
app.use(logger('dev'));

/**
 * SQL REST queries.
 */
app.use('/api/sql', require('./api/sql'));
app.use('/api/book', require('./api/book'));
app.use('/image', require('./api/image'));

/**
 * Add webpack middleware.
 */
webpackMiddleware(app);

/**
 * Run app.
 */
app.listen(PORT, function () {
    console.log(`listen on *:${PORT}`);
});
