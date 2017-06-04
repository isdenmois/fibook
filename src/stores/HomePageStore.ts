import {observable, action} from 'mobx'
import {Book} from 'models/book'
import {FetchStore} from 'models/fetch'


export default class BookListStore implements FetchStore {
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
}
