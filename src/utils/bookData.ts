import * as BookParserWorker from 'worker-loader!workers/bookParser'
import { ParsedFB2 } from 'models/parser'

export default function parseBookData(file: File): Promise<ParsedFB2> {
  let worker = new BookParserWorker()
  const promise: Promise<ParsedFB2> = new Promise((resolve, reject) => {
    worker.addEventListener('message', (event: MessageEvent) => {
      worker = undefined
      if (event.data.error) {
        return reject(event.data.error)
      }

      if (event.data.file && !(event.data.file instanceof File)) {
        event.data.file = new File([event.data.file], event.data.filename)
      }

      resolve(event.data)
    })
  })

  worker.postMessage({ type: 'PARSE_FILE', file })
  return promise
}
