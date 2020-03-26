import { ParsedFB2 } from 'models/parser'
import base64 from 'utils/base64'
import { BookParser } from 'utils/parsers/base'
import { FB2Parser } from 'utils/parsers/fb2'
import { EpubParser } from 'utils/parsers/epub'

async function parseBook(file: File) {
  const fileName = file.name.toLowerCase()
  let parser: BookParser

  if (fileName.endsWith('.epub')) {
    parser = new EpubParser(file, fileName)
  } else {
    parser = new FB2Parser(file, fileName)
  }

  await parser.parse()

  const result: ParsedFB2 = {
    author: parser.author,
    title: parser.title,
    file: parser.file,
    fileName: parser.fileName,
  }
  const cover = parser.cover

  if (cover) {
    result.image = base64(cover.data, cover.type)
    result.imageName = cover.fileName
  }

  return result
}

addEventListener('message', async (event: any) => {
  const { file, type } = event.data
  if (type !== 'PARSE_FILE') {
    return
  }

  try {
    const result = await parseBook(file)

    postMessage(result)
    close()
  } catch (error) {
    postMessage({ error: error.stack ? `${error.message}\n${error.stack}` : error.toString() })
  }
})
