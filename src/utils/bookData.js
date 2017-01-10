import BookParserWorker from '../workers/bookParser';
import { PARSE_FILE } from '../constants/BookParser';

export default function parseBookData(file) {
    let worker = new BookParserWorker();
    const promise = new Promise((resolve) => {
        worker.onmessage = (event) => {
            worker = undefined;
            resolve(event.data);
        };
    });

    worker.postMessage({
        type: PARSE_FILE,
        file,
    });
    return promise;
}
