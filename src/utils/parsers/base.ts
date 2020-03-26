import * as xmlQuery from 'xml-query'

export interface BookCover {
  data: string
  fileName: string
  type: string
}

interface IBookParser {
  author: string
  title: string
  cover: BookCover
}

export abstract class BookParser implements IBookParser {
  protected xq: any

  constructor(public file: Blob, public fileName: string) {}

  abstract parse(): Promise<void>

  protected findByAttr(name: string, attr: string, value: any) {
    const result: any[] = []
    this.xq.find(name).each((node: any) => {
      if (node.attributes[attr] === value) {
        result.push(node)
      }
    })

    return xmlQuery(result)
  }
}
