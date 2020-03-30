import request from 'utils/request'

const BOOKS_ENDPOINT = '/api/book'

interface CreateBookParams {
  file: File | Blob
  fileName: string
  author: string
  title: string
  image?: File
  imageName?: string
}

export async function createBook(
  { file, fileName, author, title, image, imageName }: CreateBookParams,
  onProgress?: (ev: ProgressEvent) => void,
) {
  const body = new FormData()
  body.append('author', author)
  body.append('title', title)
  body.append('file', file, fileName)

  if (image) {
    body.append('image', image, imageName)
    body.append('image-name', imageName)
  }
  const options = { method: 'POST', body, headers: {} }
  await request(BOOKS_ENDPOINT, options, onProgress)
}

export async function deleteBook(id: string) {
  const requestURL = `${BOOKS_ENDPOINT}/${id}`
  const options = { method: 'DELETE' }
  await request(requestURL, options)
}
