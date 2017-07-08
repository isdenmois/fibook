import map from '../map'

describe('Map util test', () => {
  it('should map empty array', () => {
    const empty = map([], () => {})
    expect(empty).toEqual([])
  })

  it('should map not empty array', () => {
    const result = map([1, 2, 3], Math.pow)
    expect(result).toEqual([1, 2, 9])
  })

  it('should map nulls and undefined', () => {
    expect(map(null, () => {})).toHaveLength(0)

    expect(map(undefined, () => {})).toHaveLength(0)
  })
})
