import processHistory from './processHistory';

/* eslint-disable no-param-reassign */
export default function processBookDetails(book, historyData = []) {
    const history = processHistory(historyData);
    if (history.length) {
        book.lastRead = history[history.length - 1].date;
    }

    book.history = history;
}
