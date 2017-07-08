import * as BookParserWorker from 'worker-loader!workers/bookParser'
import {ParsedFB2} from 'models/parser'

export default function parseBookData(file: File): Promise<ParsedFB2> {
  let worker = new BookParserWorker()
  const promise: Promise<ParsedFB2> = new Promise((resolve) => {
    worker.addEventListener('message', (event: MessageEvent) => {
      worker = undefined
      resolve(event.data)
    })
  })

  worker.postMessage({type: 'PARSE_FILE', file})
  return promise
}
