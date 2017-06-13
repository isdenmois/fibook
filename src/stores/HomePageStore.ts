import {observable, action, runInAction} from 'mobx'
import {Book} from 'models/book'
import {RSQLStore} from 'models/rsql'


export default class HomePageStore implements RSQLStore {
  @observable fetching: boolean = false

  @observable news: Book[] = []
  @observable read: Book[] = []

  @observable newsTotal: number = 0
  @observable readTotal: number = 0

  @observable newsLoadingMore: boolean = false
  @observable readLoadingMore: boolean = false

  @action
  setFetching(fetching: boolean) {
    this.fetching = fetching
  }

  @action
  setData(prop: string, data: any) {
    switch (prop) {
      case 'news':
        this.news = data
        break

      case 'read':
        this.read = data
        break
    }
  }

  @action
  setTotal(prop: string, count: number) {
    switch (prop) {
      case 'news':
        this.newsTotal = count
        break

      case 'read':
        this.readTotal = count
        break
    }
  }

  @action
  setLoadMore(prop: string, loadMore: boolean) {
    switch (prop) {
      case 'news':
        this.newsLoadingMore = loadMore
        break

      case 'read':
        this.readLoadingMore = loadMore
        break
    }
  }

  @action
  appendData(prop: string, data: any) {
    switch (prop) {
      case 'news':
        this.news = this.news.concat(data)
        break

      case 'read':
        this.read = this.read.concat(data)
        break
    }
  }

  @action
  changeBookStatus(MD5: string, status: number) {
    const findPredicate = (book: Book) => book.MD5 === MD5
    const filterPredicate = (book: Book) => book.MD5 !== MD5

    runInAction(() => {
      if (status === 1) {
        const book = this.news.find(findPredicate)
        this.read.push(book)

        this.news = this.news.filter(filterPredicate)
        this.read = this.read.sort((b1: Book, b2: Book) => b2.LastAccess - b1.LastAccess)
        this.newsTotal--
        this.readTotal++
      } else {
        const book = this.read.find(findPredicate)
        this.news.push(book)

        this.read = this.read.filter(filterPredicate)
        this.news = this.news.sort((b1: Book, b2: Book) => b2.LastModified - b1.LastModified)
        this.readTotal--
        this.newsTotal++
      }
    })
  }

  @action
  deleteBook(deletedBook: Book) {
    const filterPredicate = (book: Book) => book.MD5 !== deletedBook.MD5


    runInAction(() => {
      if (deletedBook.status === 1) {
        this.read = this.read.filter(filterPredicate)
        this.readTotal--
      } else {
        this.news = this.news.filter(filterPredicate)
        this.newsTotal--
      }
    })
  }
}
