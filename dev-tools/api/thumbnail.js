const express = require('express')
const fs = require('fs')
const { resolve } = require('path')

/**
 * Create router for images.
 */
const router = express.Router()

router.get('*', (req, res) => {
  let path = req.url
  if (path.indexOf('?') > 0) {
    path = path.slice(0, path.indexOf('?'))
  }

  path = resolve(`uploads/${path.slice(1)}.jpg`)

  fs.exists(path, exist => {
    if (exist) {
      res.header('Cache-Control', 'max-age=2629000')
      res.sendFile(path)
    } else {
      res.sendStatus(404)
    }
  })
})

module.exports = router
