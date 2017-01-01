/**
 * Convert BASE64.
 */
const sliceSize = 512;

/**
 * Convert BASE64 to Blob.
 * @param data
 * @param fileName
 * @param contentType
 * @returns {Blob}
 */
export default function convertToBlob(data, fileName, contentType = '') {
    /* global atob */
    const byteCharacters = atob(data);
    const byteArrays = [];

    for (let offset = 0, length = byteCharacters.length; offset < length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    /* global File */
    return new File(byteArrays, fileName, { type: contentType });
}