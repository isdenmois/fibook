const zopfli = require('node-zopfli');
const fs = require('fs');

const files = fs.readdirSync('./build');

files.forEach(file => {
    const path = `./build/${file}`;
    fs.readFile(path, gzipFactory(path));
});

function gzipFactory(file) {
    return function (error, content) {
        if (!error) {
            gzipFile(file, content);
        }
    };
}

function gzipFile(file, content) {
    zopfli.gzip(content, {}, (err, gziped) => {
        if (!err) {
            writeFile(file, gziped);
        }
    });
}

function writeFile(file, content) {
    fs.writeFile(file, content, err => {
        if (err) {
            console.error('error writing file');
        }
        else {
            console.log(`Optimize file: ${file}`);
        }
    });
}
