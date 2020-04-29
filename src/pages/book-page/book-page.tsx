import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { useQuery } from '@apollo/react-hooks'

import { Book } from 'models/book'

import { Toolbar } from 'components/toolbar'
import Page from 'components/page'
import { Loading } from 'components/loading'
import { Checkbox } from 'components/checkbox'

import { BookProgress } from './components/book-progress'
import { BookDetails } from './components/book-details'
import Timeline from './components/timeline'
import { Thumbnail } from './components/thumbnail'
import { BookPageButtons } from './components/book-page-buttons'
import { BOOK_QUERY } from './book-page-queries'
const s = require('./style/book-page.css')

interface BookPageParams {
  id: string
}

type Props = RouteComponentProps<BookPageParams>

export function BookPage({ match, history }: Props) {
  const id = match.params.id
  const { loading, error, data } = useQuery(BOOK_QUERY, { variables: { id } })
  const [debug, setDebug] = React.useState(false)
  const book: Book = data?.book

  const toolbar = <Toolbar backButton history={history} title='Подробности' />
  const tabbar = book ? <BookPageButtons book={book} history={history} /> : null
  const hasHistory = Boolean(book?.debugHistory.length)

  return (
    <Page name='book' className={s.bookPage} toolbar={toolbar} tabbar={tabbar}>
      {book && (
        <>
          <div className={s.primary}>
            {book.thumbnail && <Thumbnail id={book.id} />}
            <div className={s.title}>{book.title}</div>
            <div className={s.author}>{book.author}</div>

            <BookProgress book={book} />
          </div>

          <BookDetails book={book} />

          {hasHistory && (
            <>
              <div className={s.primary}>
                <Checkbox value={debug} onChange={setDebug}>
                  {debug ? 'Дебаг' : 'История'}
                </Checkbox>
              </div>
              <Timeline history={debug ? book.debugHistory : book.history} />
            </>
          )}
        </>
      )}
      {loading && <Loading />}
      {error && error.toString()}
    </Page>
  )
}
