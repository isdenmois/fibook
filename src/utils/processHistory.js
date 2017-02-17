import each from 'lodash/each';

export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

export function calculateSpeed(time, pages) {
    return Math.round(time / pages / 1000);
}

export default function processHistory(data) {
    const history = [];
    let result = {};
    let currentProgress = 0;

    each(data, (row) => {
        const date = formatDate(row.date);
        if (date !== result.date) {
            if (result.date) {
                result.speed = calculateSpeed(result.time, result.pages);
                result.percent = Math.round(result.percent);
                history.push(result);
            }

            result = {
                date,
                time: 0,
                pages: 0,
            };
        }

        const [start, end] = row.progress.split('/');
        if (start && end) {
            result.percent = (start / end) * 100;
            result.progress = row.progress;
            result.pages += start - currentProgress;
            result.time += row.time;
            currentProgress = start;
        }
    });
    const last = history.push() || {};
    if (result.date !== last.date) {
        result.speed = calculateSpeed(result.time, result.pages);
        result.percent = Math.round(result.percent);
        history.push(result);
    }

    return history;
}
