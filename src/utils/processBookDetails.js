import processHistory from './processHistory';

/* eslint-disable no-param-reassign */
export default function processBookDetails(book, historyData = []) {
    const history = processHistory(historyData);
    if (historyData.length) {
        book.lastRead = historyData.pop().date;
    }

    book.history = history;
}
