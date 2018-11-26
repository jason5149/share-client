import 'isomorphic-fetch'
import { isEmpty, merge, assign } from 'lodash'
import { stringify } from 'qs'
import { getUserInfo } from '@utils/cache'

const defaultHeaders = [
  { 'Content-Type': 'application/json;charset=UTF-8' },
]

const handleResponse = (response, formType = 'json') => {
  /* eslint-disable-next-line */
  console.info('REQUEST RESPONSE', response)
  return response[formType]()
}

const handleResult = ({ code, message, body }) => {
  /* eslint-disable-next-line */
  console.info('REQUEST RESULT  ', { code, message, body })

  return { code, message, body }
}

const handleError = error => {
  /* eslint-disable-next-line */
  console.error('REQUEST ERROR  ', error)
  // return error
  return error
}

const SendRequest = async (method = 'POST', url = '', params = {}, headers = []) => {
  const options = {
    method,
  }

  if (['GET', 'DELETE'].indexOf(method) !== -1) {
    options.headers = assign(...merge(defaultHeaders, headers, { token: getUserInfo() && getUserInfo().token}))

    url += `${ isEmpty(params) ? '' : `?${ stringify(params) }` }`
  } else if (['POST', 'PUT'].indexOf(method) !== -1) {
    options.headers = assign(...merge(defaultHeaders, headers, { token: getUserInfo() && getUserInfo().token}))

    options.body = JSON.stringify(params)
  } else if (!(params instanceof FormData)) {
    options.headers = assign(...merge(headers))
    const formData = new FormData()

    /* eslint-disable-next-line */
    for (let prop in params) {
      formData.append(prop, params[prop])  
    }

    options.body = formData
  }

  /* eslint-disable-next-line */
  console.info('REQUEST URL:    ', url)
  /* eslint-disable-next-line */
  console.info('REQUEST OPTIONS:', options)

  const response = await fetch(url, options)

  return handleResponse(response)
    .then(handleResult)
    .catch(handleError)
}

const Get = (url, params, headers, ...rest) =>  SendRequest('GET', url, params, headers, ...rest)
const Post = (url, params, headers, ...rest) => SendRequest('POST', url, params, headers, ...rest)
const Put = (url, params, headers, ...rest) => SendRequest('PUT', url, params, headers, ...rest)
const Delete = (url, params, headers, ...rest) => SendRequest('DELETE', url, params, headers, ...rest)

export {
  Get,
  Post,
  Put,
  Delete,
}