const express = require('express');
const fs = require('fs');
const { resolve } = require('path');

/**
 * Create router for images.
 */
const router = express.Router();
const file = resolve('api/book.svg');

router.get('/', (req, res) => {
    const path = req.query.path;
    if (!path) {
        return res.redirect('/image/book');
    }

    fs.exists(path, exist => {
        if (exist) {
            res.header('Cache-Control', 'max-age=2629000');
            res.sendFile(path);
        } else {
            res.redirect('/image/book');
        }
    });
});

router.get('/book', (req, res) => {
    res.header('Cache-Control', 'max-age=2629000');
    res.sendFile(file);
});

module.exports = router;
