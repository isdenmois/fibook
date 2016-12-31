import request from './request';

describe('Request', () => {
    it('should work', () => {
        const toJSON = jest.fn();
        global.fetch = jest.fn(() => Promise.resolve({
            status: 200,
            json: toJSON,
        }));

        return request('test', {}).then(() => {
            expect(global.fetch).toHaveBeenCalledWith('test', {});
            expect(toJSON).toHaveBeenCalled();
        });
    });
});
