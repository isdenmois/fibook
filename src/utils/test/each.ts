import each from '../each'

describe('Each', () => {
  it('Should iterate empty array', () => {
    const iteratee = jest.fn()
    each([], iteratee)

    expect(iteratee).not.toHaveBeenCalled()
  })

  it('Should iterate null or undefined', () => {
    const iteratee = jest.fn()
    each(null, iteratee)
    each(undefined, iteratee)

    expect(iteratee).not.toHaveBeenCalled()
  })

  it('Should iterate array', () => {
    const iteratee = jest.fn()
    each([1, 2, 3], iteratee)

    expect(iteratee).toHaveBeenCalledTimes(3)
  })

  it('Should iterate object', () => {
    const iteratee = jest.fn()
    each({ test: 'name' }, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(1)
  })
})
