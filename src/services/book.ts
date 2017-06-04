const request = require('utils/request').default
const bookDataParser = require('utils/bookData').default

const BOOKS_ENDPOINT = '/api/book'


export async function createBook(file: File) {
  const {author, image, imageName, title} = await bookDataParser(file)

  const body = new FormData()
  body.append('author', author)
  body.append('title', title)
  body.append('file', file)

  if (image) {
    body.append('image', image);
    body.append('image-name', imageName);
  }
  const options = {method: 'POST', body}
  await request(BOOKS_ENDPOINT, options)
}

export async function deleteBook(MD5: string) {
  const requestURL = `${BOOKS_ENDPOINT}/${MD5}`
  const options = {method: 'DELETE'}
  await request(requestURL, options)
}
