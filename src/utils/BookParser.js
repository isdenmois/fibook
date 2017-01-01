import et from 'elementtree';

/**
 * Book parser class.
 * Parse FB2 book using element tree library.
 */
class BookParser {
    constructor(xml) {
        this.book = et.parse(xml);
    }

    /**
     * Parse author's first name and last name.
     * @returns {string}
     */
    get author() {
        const firstName = this.book.findtext('description//author/first-name');
        const lastName = this.book.findtext('description//author/last-name');

        return `${firstName} ${lastName}`;
    }

    /**
     * Parse book title.
     * @returns {*}
     */
    get title() {
        return this.book.findtext('description//book-title');
    }

    /**
     * Parse BASE64 of cover page.
     * @returns {*}
     */
    get image() {
        const coverPath = 'description//coverpage/image';
        const bookCover = this.book.find(coverPath);

        if (!bookCover) {
            return null;
        }

        let link = bookCover.get('l:href');
        link = link.replace('#', '');
        link = `binary/[@id="${link}"]`;

        const binary = this.book.find(link);
        if (!binary) {
            return null;
        }

        const data = binary.text;
        const type = binary.get('content-type');

        return {
            data,
            type,
        };
    }
}

export default BookParser;
