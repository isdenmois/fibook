import BookParser from '../utils/BookParser';
import base64 from '../utils/base64';

/* global self, FileReader */

function readFile(file, callback, encode = 'utf-8') {
    const reader = new FileReader();

    reader.onload = (event) => {
        const result = event.target.result;

        // Find file encoding.
        const match = result.slice(0, 200).match(/encoding="(.*?)"/);
        let encoding;
        if (match) {
            encoding = match[1].toLowerCase();
        } else {
            encoding = 'utf-8';
        }

        if (encoding !== encode) {
            readFile(file, callback, encoding);
        } else {
            callback(result);
        }
    };

    reader.readAsText(file, encode);
}

// eslint-disable-next-line no-global-assign
// noinspection JSAnnotator
self.onmessage = (event) => {
    const file = event.data;
    readFile(file, (content) => {
        const book = new BookParser(content);
        const result = {
            author: book.author,
            title: book.title,
        };
        const imageData = book.image;

        if (imageData) {
            result.image = base64(imageData.data, imageData.fileName, imageData.type);
        }

        const pm = self.mockedMessage ? self.mockedMessage : self.postMessage;
        pm(result);
        self.close();
    });
};
