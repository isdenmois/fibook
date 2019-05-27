import {ParsedFB2} from 'models/parser'
import * as JSZip from 'jszip'
const BookParser = require('utils/BookParser').default
const base64 = require('utils/base64').default


function readFile(file: File, callback: Function, encode = 'utf-8') {
  const reader = new FileReader()
  let resolve: any, reject: any;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

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
      resolve(readFile(file, callback, encoding))
    } else {
      try {
        resolve(callback(result))
      } catch (e) {
        reject(e)
      }
    }
  }

  reader.onerror = reject;

  reader.readAsText(file, encode)

  return promise;
}

async function unzipFile(file: Blob, callback: Function) {
  const zip = new JSZip()

  await zip.loadAsync(file)

  const zipFile = zip.file(/\.fb2$/)[0],
        content = await zipFile.async('text'),
        blob    = await zipFile.async('blob')

  callback(content, blob, zipFile.name)
}

function parseBook(content: any, file: Blob, filename: string) {
  const book = new BookParser(content)
  const result: ParsedFB2 = {
    author: book.author,
    title: book.title,
    file, filename
  }
  const imageData = book.image

  if (imageData) {
    result.image = base64(imageData.data, imageData.type)
    result.imageName = imageData.fileName
  }

  postMessage(result)
  close()
}

addEventListener('message', async (event: any) => {
  const {file, type} = event.data
  if (type !== 'PARSE_FILE') {
    return
  }

  try {
    if (file.name.toLowerCase().endsWith('.zip')) {
      await unzipFile(file, parseBook)
    } else {
      await readFile(file, parseBook)
    }
  } catch(error) {
    postMessage({error: error.stack ? `${error.message}\n${error.stack}` : error.toString()})
  }
})
