import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { EventBus } from 'utils/event-bus'

import ListTab from 'components/list-tab'
import { Loading } from 'components/loading'
import { BOOKS_QUERY, updateQuery } from '../home-page-queries'

export function BooksList({ variables }) {
  const { loading, error, data, fetchMore, refetch } = useQuery(BOOKS_QUERY, {
    variables,
    notifyOnNetworkStatusChange: true,
  })
  React.useEffect(() => EventBus.addEventListener('refresh', () => refetch(variables)), [])

  if (!data && loading) return <Loading />
  if (!data && error) return <div>{error.toString()}</div>

  const { items, total } = data.books
  const loadMore = () => fetchMore({ variables: { offset: items.length, total }, updateQuery })

  return <ListTab data={items} loadingMore={loading} canLoadMore={items.length < total} onLoadMore={loadMore} />
}
