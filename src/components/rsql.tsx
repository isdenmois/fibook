import * as React from 'react'
import { Loading } from './loading'
import request from 'utils/request'
import queryParams from 'utils/query-params'

const ENDPOINT = '/api/sql'

interface Props {
  queries: any[]
  children: (data: any[], totals?: number[], loadMores?: boolean[]) => any
  variables?: any
  mapData?: (data: any[]) => any[]
  loading?: React.ReactNode
}

export class RsqlFetcher extends React.Component<Props> {
  static defaultProps = {
    variables: {},
  }

  private offsets: any = {}

  state = {
    variables: this.props.variables,
    data: [],
    totals: [],
    loadMores: [],
    fetching: true,
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    if (this.state.fetching) {
      return this.props.loading || <Loading />
    }

    return this.props.children(this.state.data, this.state.totals, this.state.loadMores)
  }

  async fetchData(fetching = true) {
    const variables = this.state.variables
    const promiseList = []
    const totalsPromiseList = []
    this.setState({ fetching })

    for (let q of this.props.queries) {
      const query = q.query(variables)
      const offset = this.offsets[q.prop] as number
      if (offset > 0 && query.limit > 0) {
        query.limit += offset
      }

      const promise = request(`${ENDPOINT}?${queryParams(query)}`)
      promiseList.push(promise)

      if (q.pagination) {
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

    let data: any = await Promise.all(promiseList)
    const totals: any = await Promise.all(totalsPromiseList).then(result => result.map(r => r?.count ?? 0))

    if (this.props.mapData) {
      data = this.props.mapData(data)
    }

    this.setState({ data, totals, fetching: false })
  }

  setVariables(newVariables: any) {
    this.setState({ variables: { ...this.state.variables, ...newVariables } }, () => {
      this.fetchData()
    })
  }

  async loadMore(type: string, count: number = 20) {
    const variables = this.state.variables
    const index = this.getIndex(type)

    if (index < 0) return
    const q = this.props.queries[index]

    this.setLoadMore(index, true)

    const query = q.query(variables)
    let offset = (this.offsets[q.prop] || 0) as number
    query.offset = this.state.data[index].length
    query.limit = count
    this.offsets[q.prop] = offset + count

    const data = await request(`${ENDPOINT}?${queryParams(query)}`)

    this.appendData(index, data)
    this.setLoadMore(index, false)
  }

  getData(prop: string) {
    return this.state.data[this.getIndex(prop)]
  }

  updateData(prop: string, data) {
    this.state.data[this.getIndex(prop)] = data

    this.setState({ data: [...this.state.data] })
  }

  private getIndex(prop: string) {
    return this.props.queries.findIndex(q => q.prop === prop)
  }

  private setLoadMore(index: number, value: boolean) {
    const loadMores = [...this.state.loadMores]
    loadMores[index] = value

    this.setState({ loadMores })
  }

  private appendData(index: number, data: any[]) {
    const result = [...this.state.data]
    result[index] = result[index].concat(data)

    this.setState({ data: result })
  }
}
