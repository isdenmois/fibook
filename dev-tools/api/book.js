const express = require('express');
const multipart = require('connect-multiparty');
const util = require('util');
const fs = require('fs');
const { resolve } = require('path');
const map = require('lodash/map');
const md5 = require('md5-file');

const db = require('./db');

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
    const { author, title, 'image-name': imageName } = req.body;
    const { file, image } = req.files;
    const path = resolve(`uploads/${file.name}`);
    const date = Date.now();

    fs.createReadStream(file.path)
        .pipe(fs.createWriteStream(path));
    md5(file.path, (err, hash) => {
        insertBook({
            MD5: hash,
            Authors: author,
            LastModified: date,
            Location: path,
            Name: file.name,
            Size: file.size,
            Title: title,
            Type: 'fb2',
        });

        if (image) {
            const imagePath = resolve(`uploads/${imageName}`);
            fs.createReadStream(image.path)
                .pipe(fs.createWriteStream(imagePath));
            insertThumbnail(imagePath, hash);
        }
        res.send({ message: 'ok' });
    });
});

/**
 * DELETE request handler.
 */
router.delete('/:MD5', (req, res) => {
    const MD5 = req.params.MD5;
    const query = `SELECT Location AS book, _data AS thumb
    FROM library_metadata m
    LEFT JOIN library_thumbnail t ON t.Source_MD5 = m.MD5
    WHERE m.MD5 = "${MD5}"`;

    db.get(query, (err, data) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        if (fs.existsSync(data.book)) {
            fs.unlinkSync(data.book);
        }
        if (fs.existsSync(data.thumb)) {
            fs.unlinkSync(data.thumb);
        }

        const deleteThumb = `DELETE FROM library_thumbnail WHERE Source_MD5 = "${MD5}"`;
        const deleteBook = `DELETE FROM library_metadata WHERE MD5 = "${MD5}"`;
        db.run(deleteThumb);
        db.run(deleteBook);

        res.send({ message: 'ok' });
    });
});

module.exports = router;
