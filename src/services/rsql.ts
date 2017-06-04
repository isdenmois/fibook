const request = require('utils/request').default

const SQL_ENDPOINT = '/api/sql'

interface UpdateParams {
  [index: string]: any
  where: string
}

export async function UPDATE(table: string, params: UpdateParams) {
  const requestURL =  `${SQL_ENDPOINT}/${table}`

  /* global Headers */
  const headers = new Headers();
  headers.set('Content-type', 'application/json')

  const options = {
    body: JSON.stringify(params),
    headers,
    method: 'PATCH',
  }

  await request(requestURL, options)
}
