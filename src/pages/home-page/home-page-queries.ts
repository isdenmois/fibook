import gql from 'graphql-tag'

export const BOOKS_QUERY = gql`
  query bookList($where: String!, $order: String, $limit: Int, $offset: Int, $total: Int) {
    books(where: $where, order: $order, limit: $limit, offset: $offset) {
      total
      items {
        id
        title
        author
        thumbnail
        status
        LastAccess
        LastModified
      }
    }
  }
`

export const NEW_LIST_VARS = {
  where: '(Status = 0 OR Status IS NULL) AND (Name LIKE "%.fb2" OR Name LIKE "%.epub")',
  order: 'LastModified DESC',
}

export const READ_LIST_VARS = {
  where: 'Status = 1',
  order: 'LastAccess DESC',
}

export function updateQuery(prev, { fetchMoreResult }) {
  if (!fetchMoreResult) return prev

  return Object.assign({}, prev, {
    books: {
      ...prev.books,
      total: fetchMoreResult.books.total,
      items: [...prev.books.items, ...fetchMoreResult.books.items],
    },
  })
}
