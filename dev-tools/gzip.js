const zopfli = require('node-zopfli')
const fs = require('fs')
const files = fs.readdirSync('./build')

function writeFile(err, file, content) {
  if (!err) {
    return fs.writeFile(file, content, function(err) {
      if (err) {
        return console.error('error writing file')
      } else {
        return console.log('Optimize file: ' + file)
      }
    })
  }
}

function gzipFile(file, content) {
  return zopfli.gzip(content, {}, function(err, gziped) {
    return writeFile(err, file, gziped)
  })
}

function gzipFactory(file) {
  return function(error, content) {
    return !error && gzipFile(file, content)
  }
}

files.forEach(function(file) {
  const path = './build/' + file

  return fs.readFile(path, gzipFactory(path))
})
