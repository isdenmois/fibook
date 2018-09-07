const request = require('utils/request').default
import bookDataParser from 'utils/bookData'

const BOOKS_ENDPOINT = '/api/book'


export async function createBook(f: File) {
  const {author, image, imageName, title, file} = await bookDataParser(f)

  const body = new FormData()
  body.append('author', author)
  body.append('title', title)
  body.append('file', file || f)

  if (image) {
    body.append('image', image);
    body.append('image-name', imageName);
  }
  const options = {method: 'POST', body, headers: {}}
  await request(BOOKS_ENDPOINT, options)
}

export async function deleteBook(MD5: string) {
  const requestURL = `${BOOKS_ENDPOINT}/${MD5}`
  const options = {method: 'DELETE'}
  await request(requestURL, options)
}
