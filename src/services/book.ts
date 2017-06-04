const request = require('utils/request').default


export async function deleteBook(MD5: string) {
  const requestURL = `/api/book/${MD5}`
  const options = {method: 'DELETE'}
  await request(requestURL, options)
}
