import * as JSZip from 'jszip'
const XmlReader = require('xml-reader')
const xmlQuery = require('xml-query')
import { BookParser, BookCover } from './base'

export class EpubParser extends BookParser {
  get author(): string {
    return this.getDcText('creator')
  }

  get title(): string {
    return this.getDcText('title')
  }

  cover: BookCover = null

  async parse() {
    const epub = new JSZip()
    await epub.loadAsync(this.file)

    const contents = epub.file(/\.opf$/)

    if (!contents.length) return
    const contentPath = contents[0].name
    const dir = contentPath.substring(0, contentPath.lastIndexOf('/'))
    const xml: string = await contents[0].async('text')
    const ast = XmlReader.parseSync(xml)

    this.xq = xmlQuery(ast)
    const author = this.author.replace(/\s+/g, '-').toLowerCase()
    const title = this.title.replace(/\s+/g, '-').toLowerCase()

    this.fileName = `${author}_${title}.epub`
    this.cover = await this.parseCover(epub, dir, `${author}_${title}`)
  }

  private async parseCover(zip: JSZip, dir: string, fileName: string): Promise<BookCover> {
    const coverNode = this.findByAttr('meta', 'name', 'cover')
    const coverId = coverNode.attr('content')

    if (!coverId) return null

    const itemNode = this.findByAttr('item', 'id', coverId)
    const href = itemNode.attr('href')
    const fileZip = zip.file(dir ? `${dir}/${href}` : href)

    if (!fileZip) return null

    const file = await fileZip.async('base64')
    const ext = href.slice(href.lastIndexOf('.'))

    return {
      data: file,
      fileName: fileName + ext,
      type: itemNode.attr('media-type'),
    }
  }

  private getDcText(path: string) {
    return this.xq.find(path).text() || this.xq.find(`dc:${path}`).text()
  }
}
