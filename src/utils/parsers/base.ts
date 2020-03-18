const XmlReader = require('xml-reader')
const xmlQuery = require('xml-query')
const translit = require('translit')
const translitRussian = require('translit-russian')

export interface BookCover {
  data: string
  fileName: string
  type: string
}

export abstract class BookParser {
  abstract author: string;
  abstract title: string;
  abstract cover: BookCover;

  protected xq: any

  constructor(public file: Blob, public fileName: string) {
  }

  abstract parse(): Promise<void>;

  protected findByAttr(name: string, attr: string, value: any) {
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
