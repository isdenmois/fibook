import {observable, action, runInAction} from 'mobx'
import {Book} from 'models/book'
import {FetchStore} from 'models/fetch'


export default class HomePageStore implements FetchStore {
  @observable fetching: boolean = false
  @observable news: Book[] = []
  @observable read: Book[] = []

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
  changeBookStatus(MD5: string, status: number) {
    const findPredicate = (book: Book) => book.MD5 === MD5
    const filterPredicate = (book: Book) => book.MD5 !== MD5

    runInAction(() => {
      if (status === 1) {
        const book = this.news.find(findPredicate)
        this.read.push(book)

        this.news = this.news.filter(filterPredicate)
        this.read = this.read.sort((b1: Book, b2: Book) => b2.LastAccess - b1.LastAccess)
      } else {
        const book = this.read.find(findPredicate)
        this.news.push(book)

        this.read = this.read.filter(filterPredicate)
        this.news = this.news.sort((b1: Book, b2: Book) => b2.LastModified - b1.LastModified)
      }
    })
  }

  @action
  deleteBook(deletedBook: Book) {
    const filterPredicate = (book: Book) => book.MD5 !== deletedBook.MD5

    if (deletedBook.status === 1) {
      this.read = this.read.filter(filterPredicate)
    } else {
      this.news = this.news.filter(filterPredicate)
    }
  }
}
