import * as React from 'react'
import {runInAction} from 'mobx'
import {inject, observer} from 'mobx-react'
import {FetchStore} from "../models/fetch";
const request = require('./request').default
const queryParams = require('./queryParams').default
const each = require('./each').default


const ENDPOINT = '/api/sql'

export function fetchContainer(params: FetchParams): ClassDecorator {
  return function (component: React.ComponentClass<any>): Function {

    @inject(params.store)
    @observer
    class FetchContainer extends React.Component<any, any> {
      state = {
        fetching: false,
        variables: params.initialVariables,
        data: {},
      }

      render() {
        return React.createElement(component, {
          ...this.props,
          ...this.state.data,
          fetch: {
            variables: this.state.variables,
            fetching: this.state.fetching,
            fetchData: this.handleFetch,
            setVariables: this.handleSetVariables,
          }
        })
      }

      private handleFetch = async () => {
        const store: FetchStore = this.props[params.store]
        const variables = this.state.variables
        const promiseList = []
        store.setFetching(true)

        for (let q of params.queries) {
          const query = q.query(variables)

          const promise = request(`${ENDPOINT}?${queryParams(query)}`)
            .then((data: any[]) => ({key: q.prop, data}))
          promiseList.push(promise)
        }

        const result: any = await Promise.all(promiseList)
        runInAction('set book data', () => {
          each(result, (qr: any) => store.setData(qr.key, qr.data))
          store.setFetching(false)
        })
      }

      private handleSetVariables = (newVariables: any) => {
        this.setState({variables: {...this.state.variables, ...newVariables}}, () => {
          this.handleFetch()
        })
      }
    }

    return (props: any) => React.createElement(FetchContainer, {...props})
  }
}

interface FetchParams {
  initialVariables: any
  queries: Query[]
  store: string
  mapFetchToProps?: (data: any) => any
}

interface Query {
  prop: string
  query: (variables: any) => QueryParams
}

interface QueryParams {
  fields: string[],
  table: string,
  where?: string,
  order?: string,
  limit?: number,
}

export interface FetchProps {
  variables: any
  fetching: boolean
  fetchData: () => void
  setVariables: (variables: any) => void
}
