import { BookHistory, RawHistory } from 'models/book'
const HOUR = 3600
const MAX_SPEED = 10

export function formatDate(date: number) {
  return new Date(date).toLocaleDateString()
}

export function getSpeed(time: number, pages: number) {
  return time / pages / 1000
}

export function getPagesSpeed(time: number, pages: number) {
  return Math.round(HOUR / getSpeed(time, pages))
}

export default function processHistory(data: RawHistory[], debug?: boolean) {
  const history: BookHistory[] = []
  let result: BookHistory = { date: '', time: 0, pages: 0 }
  let currentProgress = 0

  data.forEach((row: RawHistory) => {
    const date = formatDate(+row.date)

    if (date !== result.date) {
      if (result.time > 0) {
        result.speed = getPagesSpeed(result.time, result.pages)
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
      if (getSpeed(+row.time, +start - currentProgress) > MAX_SPEED || +row.time > 20000 || debug) {
        result.percent = (+start / +end) * 100
        result.progress = row.progress
        result.pages += +start - currentProgress
        result.time += +row.time
      }

      currentProgress = +start
    }
  })

  const date = history.length > 0 ? history[history.length - 1].date : ''
  if (result.date !== date) {
    result.speed = getPagesSpeed(result.time, result.pages)
    result.percent = Math.round(result.percent)
    history.push(result)
  }

  return history
}
