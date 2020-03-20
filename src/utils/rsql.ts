import * as React from 'react'
import { runInAction } from 'mobx'
import { inject, observer } from 'mobx-react'
import { RSQLStore } from '../models/rsql'
const request = require('./request').default
const queryParams = require('./queryParams').default
const each = require('./each').default

const ENDPOINT = '/api/sql'

export function rsqlContainer(params: RSQLParams): ClassDecorator {
  return function(component: any): any {
    @inject(params.store)
    @observer
    class RSQLContainer extends React.Component<any> {
      private offsets: any = {}

      state = {
        variables: params.initialVariables,
        data: {},
      }

      render() {
        return React.createElement(component, {
          ...this.props,
          ...this.state.data,
          rsql: {
            variables: this.state.variables,
            fetchData: this.handleFetch,
            setVariables: this.handleSetVariables,
            loadMore: this.handleLoadMore,
          },
        })
      }

      private handleFetch = async () => {
        const store: RSQLStore = this.props[params.store]
        const variables = this.state.variables
        const promiseList = []
        const totalsPromiseList = []
        store.setFetching(true)

        for (let q of params.queries) {
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
        })
      }

      private handleSetVariables = (newVariables: any) => {
        this.setState({ variables: { ...this.state.variables, ...newVariables } }, () => {
          this.handleFetch()
        })
      }

      private handleLoadMore = async (type: string, count: number = 20) => {
        const store: RSQLStore = this.props[params.store]
        const variables = this.state.variables

        const q = params.queries.find(q => q.prop === type)
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
        })
      }
    }

    return (props: any) => React.createElement(RSQLContainer, { ...props })
  }
}

interface RSQLParams {
  initialVariables: any
  queries: Query[]
  store: string
}

interface Query {
  prop: string
  query: (variables: any) => QueryParams
  pagination?: boolean
}

interface QueryParams {
  fields: string[]
  table: string
  where?: string
  order?: string
  limit?: number
  offset?: number
}

export interface RSQLProps {
  variables: any
  fetching: boolean
  fetchData: () => void
  setVariables: (variables: any) => void
  loadMore: (type: string, count?: number) => void
}
