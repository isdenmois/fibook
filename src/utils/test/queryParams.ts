import queryParams from '../queryParams'

describe('queryParams', () => {
  it('should work on empty data', () => {
    expect(queryParams()).toBeFalsy()
  })

  it('should serialize nulls', () => {
    expect(queryParams({ a: null })).toEqual('a=null')
  })

  it('should query single param objects', () => {
    const data = { a: 'тest 1' }
    const expected = 'a=%D1%82est%201'
    expect(queryParams(data)).toEqual(expected)
  })

  it('should query multikey objects', () => {
    const data = { a: 'тest 1', b: 'тest 2' }
    const expected = 'a=%D1%82est%201&b=%D1%82est%202'
    expect(queryParams(data)).toEqual(expected)
  })

  it('should query arrays', () => {
    const data = {
      a: 'a',
      b: ['c'],
    }
    let expected = 'a=a&b[]=c'
    expect(queryParams(data)).toEqual(expected)

    data.b.push('d')
    expected = 'a=a&b[]=c&b[]=d'
    expect(queryParams(data)).toEqual(expected)

    data.b.push('е')
    expected = 'a=a&b[]=c&b[]=d&b[]=%D0%B5'
    expect(queryParams(data)).toEqual(expected)
  })
})
