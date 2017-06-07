const XmlReader = require('xml-reader')
const xmlQuery = require('xml-query')
const translit = require('translit')
const translitRussian = require('translit-russian')

const t = translit(translitRussian)

/**
 * Book parser class.
 * Parse FB2 book using element tree library.
 */
class BookParser {
  private xq: any
  private description: any
  private titleInfo: any
  private publishInfo: any

  constructor(xml: string) {
    const ast = XmlReader.parseSync(xml)
    this.xq = xmlQuery(ast)
    this.description = this.xq.find('description')
    this.titleInfo = this.description.find('title-info')
    this.publishInfo = this.description.find('publish-info')
  }

  /**
   * Parse author's first name and last name.
   * @returns {string}
   */
  get author() {
    const author = this.titleInfo.find('author')
    const firstName = author.find('first-name').text()
    const lastName = author.find('last-name').text()

    return `${firstName} ${lastName}`
  }

  /**
   * Parse book title.
   * @returns {*}
   */
  get title() {
    return this.titleInfo.find('book-title').text()
  }

  /**
   * Parse BASE64 of cover page.
   * @returns {*}
   */
  get image() {
    let id = this.titleInfo
      .find('coverpage')
      .find('image')
      .attr('l:href')

    if (!id) {
      return null
    }

    id = id.replace('#', '')
    const binary = this.findByAttr('binary', 'id', id)

    if (binary.length === 0) {
      return null
    }

    let fileName = `${this.author}_${this.title}.jpg`
    fileName = fileName.replace(/ /g, '_')
    fileName = t(fileName)
    fileName = fileName.toLowerCase()

    return {
      data: binary.text(),
      fileName,
      type: binary.attr('content-type'),
    }
  }

  findByAttr(name: string, attr: string, value: any) {
    const result: any[] = []
    this.xq
      .find(name)
      .each((node: any) => {
        if (node.attributes[attr] === value) {
          result.push(node)
        }
      })

    return xmlQuery(result)
  }
}

export default BookParser
