import each from 'utils/each'
import { BookHistory, RawHistory } from 'models/book'

export function formatDate(date: number) {
  return new Date(date).toLocaleDateString()
}

export function calculateSpeed(time: number, pages: number) {
  return Math.round(time / pages / 1000)
}

export default function processHistory(data: RawHistory[]) {
  const history: BookHistory[] = []
  let result: BookHistory = { date: '', time: 0, pages: 0 }
  let currentProgress = 0

  each(data, (row: RawHistory) => {
    const date = formatDate(+row.date)
    if (date !== result.date) {
      if (result.date) {
        result.speed = calculateSpeed(result.time, result.pages)
        result.percent = Math.round(result.percent)
        history.push(result)
      }

      result = {
        date,
        time: 0,
        pages: 0,
      }
    }

    const [start, end] = row.progress.split('/')
    if (start && end) {
      result.percent = (+start / +end) * 100
      result.progress = row.progress
      result.pages += +start - currentProgress
      result.time += +row.time
      currentProgress = +start
    }
  })

  const date = history.length > 0 ? history[history.length - 1].date : ''
  if (result.date !== date) {
    result.speed = calculateSpeed(result.time, result.pages)
    result.percent = Math.round(result.percent)
    history.push(result)
  }

  return history
}
