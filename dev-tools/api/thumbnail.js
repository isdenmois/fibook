const express = require('express')
const fs = require('fs')
const os = require('os')

/**
 * Create router for images.
 */
const router = express.Router()

router.get('*', (req, res) => {
  let path = req.url
  if (path.indexOf('?') > 0) {
    path = path.slice(0, path.indexOf('?'))
  }

  if (os.platform() === 'win32') {
    path = path.slice(1)
  }

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
