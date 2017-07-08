import {minBy, maxBy} from '../minBy'


describe('minBy', () => {
  it('Should returns null on empty array', () => {
    expect(minBy([], 'field')).toEqual(null)
  })

  it('Should find min in array', () => {
    expect(minBy([{test: 1}, {test: 2}, {test: -1}], 'test')).toBe(-1)
  })
})

describe('maxBy', () => {
  it('Should find max in array', () => {
    expect(maxBy([{f: 1}, {f: 2}, {f: -1}], 'f')).toBe(2)
  })
})
