const KB = 1024;
const TenKB = 10 * KB;
const MB = 1048576;
const TenMB = 10 * MB;

/**
 * Convert bytes to human-readable format.
 * @param size
 */
export default function convert(size: number) {
    if (size < KB) {
        return `${size} Б`;
    }

    if (size < TenKB && size % KB !== 0) {
        const div = size / KB;
        return `${div.toFixed(2)} КБ`.replace('.', ',');
    }

    if (size < MB) {
        const div = size / KB;
        return `${div.toFixed()} КБ`;
    }

    if (size < TenMB && size % MB !== 0) {
        const div = size / MB;
        return `${div.toFixed(2)} МБ`.replace('.', ',');
    }

    const div = size / MB;
    return `${div.toFixed()} МБ`;
}
