import * as JSZip from 'jszip'
import * as XmlReader from 'xml-reader'
import * as xmlQuery from 'xml-query'
import * as translit from 'translit'
import * as translitRussian from 'translit-russian'
import { BookParser } from './base'

export class FB2Parser extends BookParser {
  private description: any
  private titleInfo: any
  private publishInfo: any
  private t = translit(translitRussian)
  private content: string

  get author() {
    const author = this.titleInfo.find('author')
    const firstName = author.find('first-name').text()
    const lastName = author.find('last-name').text()

    return `${firstName} ${lastName}`
  }

  get title() {
    return this.titleInfo.find('book-title').text()
  }

  get cover() {
    let id = this.titleInfo
      .find('coverpage')
      .find('image')
      .attr('l:href')

    if (!id) {
      return null
    }

    id = id.replace('#', '')
    const binary = this.findByAttr('binary', 'id', id).first()
    const ext = id.slice(id.lastIndexOf('.'))

    if (binary.length === 0) {
      return null
    }

    let fileName = `${this.author}_${this.title}${ext}`
    fileName = fileName.replace(/ /g, '_')
    fileName = this.t(fileName)
    fileName = fileName.toLowerCase()

    return {
      data: binary.text(),
      fileName,
      type: binary.attr('content-type'),
    }
  }

  async parse() {
    if (this.fileName.endsWith('.zip')) {
      const data = await unzipFile(this.file)

      this.file = data.file
      this.fileName = data.fileName
      this.content = data.content
    } else {
      await readFile(this.file as File, (content: string) => {
        this.content = content
      })
    }

    this.parseContent()
  }

  private parseContent() {
    const ast = XmlReader.parseSync(this.content)

    this.xq = xmlQuery(ast)
    this.description = this.xq.find('description')
    this.titleInfo = this.description.find('title-info')
    this.publishInfo = this.description.find('publish-info')
  }
}

async function unzipFile(file: Blob) {
  const zip = new JSZip()

  await zip.loadAsync(file)

  const zipFile = zip.file(/\.fb2$/)[0],
    content = await zipFile.async('text'),
    blob = await zipFile.async('blob')

  return { content, file: blob, fileName: zipFile.name }
}

// TODO: refactor
function readFile(file: File, callback: Function, encode = 'utf-8') {
  const reader = new FileReader()
  let resolve: any, reject: any

  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

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

  reader.onerror = reject

  reader.readAsText(file, encode)

  return promise
}
