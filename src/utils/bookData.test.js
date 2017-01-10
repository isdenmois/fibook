describe('parseBookData()', () => {
    jest.mock('../workers/bookParser', () => {
        return class Worker {
            postMessage(data) {
                this.onmessage({ data: data.file });
            }
        };
    });

    const parseBookData = require('./bookData').default;
    it('should work', () => {
        return parseBookData('test')
            .then(data => expect(data).toEqual('test'));
    });
});
