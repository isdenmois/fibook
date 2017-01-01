const express = require('express');
const multipart = require('connect-multiparty');
const util = require('util');
const fs = require('fs');
const { resolve } = require('path');
const map = require('lodash/map');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('onyx.db');
const md5 = require('md5-file');

/**
 * Create router for book API.
 */
const router = express.Router();

function insertBook(options, callback) {
    const fields = [];
    const values = map(options, (value, key) => {
        fields.push(key);
        return `"${value}"`;
    });

    let query = `
    INSERT INTO library_metadata (${fields.join(',')})
    VALUES (${values.join(',')})`;

    db.run(query, callback);
}

function insertThumbnail(path, MD5) {
    let query = `
    INSERT INTO library_thumbnail (_data, Source_MD5, Thumbnail_Kind)
    VALUES ("${path}", "${MD5}", "Original")`;

    db.run(query);
}

/**
 * POST-request handler.
 */
router.post('/', multipart(), (req, res) => {
    const { author, title } = req.body;
    const { file, image } = req.files;
    const path = resolve(`uploads/${file.name}`);
    const date = new Date();

    fs.createReadStream(file.path)
        .pipe(fs.createWriteStream(path));
    md5(file.path, (err, hash) => {
        insertBook({
            MD5: hash,
            Authors: author,
            LastAccess: date,
            LastModified: date,
            Location: path,
            Name: file.name,
            Size: file.size,
            Status: 0,
            Title: title,
            Type: 'fb2',
        });

        if (image) {
            const imagePath = resolve(`uploads/${image.name}`);
            fs.createReadStream(image.path)
                .pipe(fs.createWriteStream(imagePath));
            insertThumbnail(imagePath, hash);
        }
        res.send({ message: 'ok' });
    });
});

module.exports = router;
