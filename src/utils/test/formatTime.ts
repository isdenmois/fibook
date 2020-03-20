import formatTime, { formatDaysLength } from '../formatTime'

describe('formatTime util', () => {
  it('should format time', () => {
    expect(formatTime(10)).toBe('0м 0с')
    expect(formatTime(10000)).toBe('0м 10с')
    expect(formatTime((6 * 60 + 7) * 1000)).toBe('6м 7с')
    expect(formatTime((40 * 60 * 60 + 27 * 60 + 5) * 1000)).toBe('40ч 27м')
  })

  it('should format days difference', () => {
    expect(formatDaysLength(1, 100000001)).toBe(2)
    expect(formatDaysLength(new Date(2017, 9, 3).getTime(), new Date(2017, 9, 16).getTime())).toBe(14)
  })
})
