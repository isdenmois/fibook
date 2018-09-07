zopfli = require('node-zopfli-es')
fs = require('fs')

files = fs.readdirSync('./build')

writeFile = (err, file, content) ->
    fs.writeFile(file, content, (err) ->
        if err
            console.error('error writing file')
        else
            console.log("Optimize file: #{file}")
    ) if !err

gzipFile = (file, content) -> zopfli.gzip(content, {}, (err, gziped) -> writeFile(err, file, gziped))

gzipFactory = (file) -> (error, content) -> !error && gzipFile(file, content)

files.forEach((file) ->
    path = "./build/#{file}"
    fs.readFile(path, gzipFactory(path))
)
