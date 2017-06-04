import * as React from 'react'
const request = require('./request').default
const queryParams = require('./queryParams').default
const each = require('./each').default


const ENDPOINT = '/api/sql'

export function fetchContainer(params: FetchParams): ClassDecorator {
  return function (component: React.ComponentClass<any>): Function {
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

      private handleFetch = () => {
        const variables = this.state.variables
        const promiseList = []

        for (let q of params.queries) {
          const query = q.query(variables)

          const promise = request(`${ENDPOINT}?${queryParams(query)}`)
            .then((data: any[]) => ({key: q.prop, data}))
          promiseList.push(promise)
        }

        Promise.all(promiseList).then((result: any) => {
          const data: any = {}
          each(result, (qr: any) => data[qr.key] = qr.data)

          if (params.mapFetchToProps) {
            this.setState({data: params.mapFetchToProps(data)})
          } else {
            this.setState({data})
          }
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
