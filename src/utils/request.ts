import QueryParams from './query-params'

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

export default function request(url: string, params?: RequestParams, onprogress?: (ev: ProgressEvent) => any) {
  return new Promise((resolve, reject) => {
    const options: RequestParams = { ...defaults, ...params }

    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onprogress
    xhr.onerror = reject
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(xhr.responseText && JSON.parse(xhr.responseText))
        } catch (e) {
          reject(xhr.responseText)
        }
      } else {
        reject(xhr.responseText)
      }
    }

    xhr.open(options.method, options.params ? `${url}?${QueryParams(options.params)}` : url, true)

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
