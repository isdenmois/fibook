import BookParserWorker from '../workers/bookParser';

export default function parseBookData(file) {
    let worker = new BookParserWorker();
    const promise = new Promise((resolve) => {
        worker.onmessage = (event) => {
            worker = undefined;
            resolve(event.data);
        };
    });

    worker.postMessage(file);
    return promise;
}
