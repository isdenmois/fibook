import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

export default function fromGenerator (generator) {
    const _next = function () {
        const args = Array.prototype.slice.call(arguments);
        return generator.next.apply(generator, args);
    };
    const _throw = function () {
        const args = Array.prototype.slice.call(arguments);
        return generator.throw.apply(generator, args);
    };

    const _nextIs = function (fn, mock, effect) {
        return function () {
            const args = Array.prototype.slice.call(arguments);
            expect(fn(mock).value).toEqual(effect.apply(null, args));
        }
    };

    function wrap (fn) {
        return function (mock) {
            return {
                call: _nextIs(fn, mock, call),
                fork: _nextIs(fn, mock, fork),
                put: _nextIs(fn, mock, put),
            };
        };
    }

    return {
        next: wrap(_next),
        throwNext: wrap(_throw),
        forkTakeLatest: function () {
            const args = Array.prototype.slice.call(arguments);
            args.unshift(takeLatest);
            const expected = fork.apply(null, args);

            expect(_next().value).toEqual(expected);
        },
    }
}
