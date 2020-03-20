const express = require('express')
const logger = require('morgan')
const webpackMiddleware = require('./webpack/middleware')

const PORT = process.env.PORT || 4000
const app = express()

app.use(logger('dev'))

app.use('/api/sql', require('./api/sql'))
app.use('/api/book', require('./api/book'))
app.use('/thumbnail', require('./api/thumbnail'))

webpackMiddleware(app)

app.listen(PORT, () => console.log('listen on *:' + PORT))
