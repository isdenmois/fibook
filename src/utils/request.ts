import QueryParams from './queryParams'

interface RequestParams {
  method?: string
  headers?: {
    [index: string]: string
  }
  params?: {
    [index: string]: string
  }
  body?: any
}

const defaults = <RequestParams>{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

export default function request(url: string, params?: RequestParams) {
  return new Promise((resolve, reject) => {
    const options: RequestParams = {...defaults, ...params}

    const xhr = new XMLHttpRequest()
    xhr.open(options.method, options.params ? `${url}?${QueryParams(options.params)}` : url, true)
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText && JSON.parse(xhr.responseText))
      } else {
        reject(xhr)
      }
    })

    for (const k in options.headers) {
      xhr.setRequestHeader(k, options.headers[k])
    }

    if (options.body) {
      xhr.send(options.body)
    } else {
      xhr.send()
    }
  })
}
