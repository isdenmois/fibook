import * as React from 'react'
import { runInAction } from 'mobx'
import { RSQLStore } from 'models/rsql'
const request = require('utils/request').default
const queryParams = require('utils/queryParams').default
const each = require('utils/each').default

const ENDPOINT = '/api/sql'

interface Props {
  variables: any
  children: (params: any) => any
  store: RSQLStore
  queries: any
}

export class RsqlFetcher extends React.Component<Props> {
  static defaultProps = {
    variables: {},
  }

  private offsets: any = {}

  state = {
    variables: this.props.variables,
    data: {},
  }

  render() {
    return this.props.children(this.state.data)
  }

  async fetchData() {
    const store: RSQLStore = this.props.store
    const variables = this.state.variables
    const promiseList = []
    const totalsPromiseList = []
    store.setFetching(true)

    for (let q of this.props.queries) {
      const query = q.query(variables)
      const offset = this.offsets[q.prop] as number
      if (offset > 0 && query.limit > 0) {
        query.limit += offset
      }

      const promise = request(`${ENDPOINT}?${queryParams(query)}`).then((data: any[]) => ({ key: q.prop, data }))
      promiseList.push(promise)

      if (q.pagination && store.setTotal) {
        const totalParams = queryParams({
          fields: ['COUNT(*) as count'],
          table: query.table,
          where: query.where,
        })
        totalsPromiseList.push(
          request(`${ENDPOINT}?${totalParams}`).then((data: any[]) => ({ key: q.prop, count: data[0].count })),
        )
      }
    }

    const result: any = await Promise.all(promiseList)
    const totals: any = await Promise.all(totalsPromiseList)
    runInAction('set book data', () => {
      each(result, (qr: any) => store.setData(qr.key, qr.data))
      each(totals, (tr: any) => store.setTotal(tr.key, tr.count))
      store.setFetching(false)
      this.setState({})
    })
  }

  setVariables(newVariables: any) {
    this.setState({ variables: { ...this.state.variables, ...newVariables } }, () => {
      this.fetchData()
    })
  }

  async loadMore(type: string, count: number = 20) {
    const store: RSQLStore = this.props.store
    const variables = this.state.variables

    const q = this.props.queries.find(q => q.prop === type)

    if (!q) {
      return
    }
    store.setLoadMore(type, true)

    const query = q.query(variables)
    let offset = (this.offsets[q.prop] || 0) as number
    query.offset = (store as any)[type].length
    query.limit = count
    this.offsets[q.prop] = offset + count

    const result = await request(`${ENDPOINT}?${queryParams(query)}`)

    runInAction(() => {
      store.appendData(q.prop, result)
      store.setLoadMore(type, false)
      this.setState({})
    })
  }
}
