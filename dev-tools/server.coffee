express = require('express')
logger = require('morgan')
webpackMiddleware = require('./webpack/middleware')

PORT = process.env.PORT || 4000

app = express()

# Use express logger.
app.use(logger('dev'))

# SQL REST
app.use('/api/sql', require('./api/sql'))
app.use('/api/book', require('./api/book'))
app.use('/thumbnail', require('./api/thumbnail'))

# Add webpack middleware.
webpackMiddleware(app);

# Run app
app.listen(PORT, () -> console.log("listen on *:#{PORT}"))
