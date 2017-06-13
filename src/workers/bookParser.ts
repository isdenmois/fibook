import {ParsedFB2} from 'models/parser'
const BookParser = require('utils/BookParser').default
const base64 = require('utils/base64').default


function readFile(file: File, callback: Function, encode = 'utf-8') {
  const reader = new FileReader()

  reader.onload = (event: any) => {
    const result = event.target.result

    // Find file encoding.
    const match = result.slice(0, 200).match(/encoding="(.*?)"/)
    let encoding
    if (match) {
      encoding = match[1].toLowerCase()
    } else {
      encoding = 'utf-8'
    }

    if (encoding !== encode) {
      readFile(file, callback, encoding)
    } else {
      callback(result)
    }
  }

  reader.readAsText(file, encode)
}

addEventListener('message', (event: any) => {
  const {file, type} = event.data
  if (type !== 'PARSE_FILE') {
    return
  }

  readFile(file, (content: any) => {
    const book = new BookParser(content)
    const result: ParsedFB2 = {
      author: book.author,
      title: book.title,
    }
    const imageData = book.image

    if (imageData) {
      result.image = base64(imageData.data, imageData.type)
      result.imageName = imageData.fileName
    }

    postMessage(result)
    close()
  })
})
