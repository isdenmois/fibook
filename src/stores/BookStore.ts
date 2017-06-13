import {observable, action, computed} from 'mobx'
import {Book, BookHistory} from "../models/book"
import {RSQLStore} from "../models/rsql"
import HomePageStore from "./HomePageStore";
const processHistory = require('utils/processHistory').default


export default class BookStore implements RSQLStore {
  homePageStore: HomePageStore

  @observable fetching: boolean = false
  @observable book: Book = null
  @observable history: BookHistory[] = []

  constructor(homePageStore: HomePageStore) {
    this.homePageStore = homePageStore
  }

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
    this.homePageStore.changeBookStatus(this.book.MD5, status)
  }

  @action
  deleteBook() {
    this.homePageStore.deleteBook(this.book)
    this.book = null
  }
}
