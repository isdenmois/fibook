import * as React from 'react'

import { ConfirmContext } from 'components/confirm'
import { Button } from 'components/button'
import { useMutation } from '@apollo/react-hooks'
import { changeStatusUpdate, removeBookUpdate, UPDATE_STATUS, DELETE_BOOK } from '../book-page-queries'
import { Book } from 'models/book'

interface Props {
  book: Book
  history: any
}

export function BookPageButtons({ book, history }) {
  const context = React.useContext(ConfirmContext)
  const [changeStatus] = useMutation(UPDATE_STATUS)
  const [deleteBook] = useMutation(DELETE_BOOK)

  const updateStatus = React.useCallback(() => {
    const status = book.status > 0 ? 0 : 1

    changeStatus({
      variables: { id: book.id, status },
      optimisticResponse: {
        changeStatus: { __typename: 'Book', id: book.id, status },
      },
      update: changeStatusUpdate,
    })
  }, [book])

  const removeBook = React.useCallback(() => {
    context.confirm('Вы действительно хотите удалить книгу?').then(async selected => {
      if (selected) {
        history.push('/')

        deleteBook({
          variables: { id: book.id, status: book.status },
          optimisticResponse: {
            deleteBook: { id: book.id, status: book.status },
          },
          update: removeBookUpdate,
        })
      }
    })
  }, [book])

  return (
    <>
      <Button key='status' onClick={updateStatus}>
        {book.status > 0 ? 'В новые' : 'В прочтенные'}
      </Button>
      <Button key='delete' dangerous onClick={removeBook}>
        Удалить
      </Button>
    </>
  )
}
