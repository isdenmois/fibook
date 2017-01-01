describe('parseBookData()', () => {
    jest.mock('../workers/bookParser', () => {
        return class Worker {
            postMessage(file) {
                this.onmessage({ data: file });
            }
        };
    });

    const parseBookData = require('./bookData').default;
    it('should work', () => {
        return parseBookData('test')
            .then(data => expect(data).toEqual('test'));
    });
});
