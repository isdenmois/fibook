const express = require('express');
const multipart = require('connect-multiparty');
const util = require('util');

/**
 * Create router for book API.
 */
const router = express.Router();

/**
 * POST-request handler.
 */
router.post('/', multipart(), (req, res) => {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: req.body, files: req.files}));
});

/**
 * Simple form for GET-request.
 */
router.get('/', (req, res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="text" name="author"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
});

module.exports = router;
