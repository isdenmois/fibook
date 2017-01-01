// import BookParser from '../utils/BookParser';
// import base64 from '../utils/base64';

describe('bookParser worker', () => {
    // Mock BookParser.
    jest.mock('../../utils/BookParser', () => {
        return function MockedBookParser(file) {
            this.author = 'test author';
            this.title = 'test title';

            if (file.indexOf('image') >= 0) {
                this.image = {
                    data: '',
                    fileName: 'test.img',
                };
            }
        };
    });

    // Mock base64.
    jest.mock('../../utils/base64', () => {
        return function (image, fileName) {
            return `parsed ${fileName}`;
        };
    });

    // Mock worker context.
    global.self = {};

    // Mock FileReader.
    global.FileReader = function () {};
    global.FileReader.prototype.readAsText = function (file) {
        this.onload({
            target: {
                result: file,
            },
        });
    };

    global.self.mockedMessage = jest.fn();
    require('../bookParser');

    it('should parse files', () => {
        const file = 'file';
        window.onmessage({
            data: file,
        });

        expect(global.self.mockedMessage).toHaveBeenCalledWith({
            author: 'test author',
            title: 'test title',
        });
    });

    it('should parse images', () => {
        const file = 'file with image';
        global.self.mockedMessage.mockReset();
        window.onmessage({
            data: file,
        });

        expect(global.self.mockedMessage).toHaveBeenCalledWith({
            author: 'test author',
            title: 'test title',
            image: 'parsed test.img',
        });
    });

    it('should parse encoding', () => {
        const file = 'encoding="windows-1251"';
        global.self.mockedMessage.mockReset();
        window.onmessage({
            data: file,
        });

        expect(global.self.mockedMessage).toHaveBeenCalledWith({
            author: 'test author',
            title: 'test title',
        });
    });
});
