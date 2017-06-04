import {observable, action, computed} from 'mobx'
import {Book, BookHistory} from "../models/book"
import {FetchStore} from "../models/fetch"
const processHistory = require('utils/processHistory').default


export default class BookStore implements FetchStore {
  @observable fetching: boolean = false
  @observable book: Book = null
  @observable history: BookHistory[] = []

  @computed get lastRead(): string {
    if (!!this.history && this.history.length > 0) {
      return this.history[this.history.length - 1].date
    }

    return ''
  }

  @action
  setData(prop: string, data: any) {
    switch (prop) {
      case 'book':
        this.book = data[0]
        break

      case 'history':
        this.history = processHistory(data || [])
        break
    }
  }

  @action
  setFetching(fetching: boolean) {
    this.fetching = fetching
  }

  @action
  changeStatus(status: number) {
    this.book = {...this.book, status}
  }
}
