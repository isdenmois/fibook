import convert from '../file-size'

describe('FileSize convert', () => {
  it('should works', () => {
    expect(convert(1)).toEqual('1 Б')
    expect(convert(1024)).toEqual('1 КБ')
    expect(convert(1920)).toEqual('1,88 КБ')
    expect(convert(50000)).toEqual('49 КБ')
    expect(convert(1234567)).toEqual('1,18 МБ')
    expect(convert(44044004)).toEqual('42 МБ')
  })
})
