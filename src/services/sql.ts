import request from 'utils/request'

const SQL_ENDPOINT = '/api/sql'

interface UpdateParams {
  [index: string]: any
  where: string
}

export async function UPDATE(table: string, params: UpdateParams) {
  const requestURL = `${SQL_ENDPOINT}/${table}`
  const options = { body: JSON.stringify(params), method: 'PATCH' }

  await request(requestURL, options)
}
