const express = require('express');
const logger = require('morgan');
const resolve = require('path').resolve;
const setup = require('./webpack/middleware');

const PORT = process.env.PORT || 4000;

const app = express();
setup(app);

/**
 * Use express logger.
 */
app.use(logger('dev'));

/**
 * SQL REST queries.
 */
app.use('/api/sql', require('./api/sql'));

/**
 * Run app.
 */
app.listen(PORT, function () {
    console.log(`listen on *:${PORT}`);
});
