import { isEmptyObject, object2Url } from 'pms-saas-common'

/**
 * 
 * @param {*} response 
 * @param {*} formType 
 */
const handleResponse = (response, formType) => {
  return response[formType]()
}

/**
 * 
 * @param {*} { code, data, message } 
 */
const handleResult = ({ code, body, message }) => {
  return {
    code, 
    body,
    message,
  }
}

/**
 * 
 * @param {*} error 
 */
const handleError = error => {
  return error
}

/**
 * 
 * @param {*} url 
 * @param {*} options 
 */
const send = async (url, options, formType = 'json') => {
  const response = await fetch(url, options)

  return handleResponse(response, formType)
    .then(handleResult)
    .catch(handleError)
}

/**
 * 
 * @param {*} method 
 * @param {*} url 
 * @param {*} params 
 * @param {*} headers 
 */
const handleOptions = (method = 'POST', url = '', params = {}, headers = {}) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...headers,
    },
  }

  let formType = 'json'

  if (!(params instanceof FormData)) {
    if (['GET', 'DELETE'].indexOf(method) !== -1) {
      url += `${ !isEmptyObject(params) ? `?${ object2Url(params) }` : '' }`
    } else if (['POST', 'PUT'].indexOf(method) !== -1) {
      options.body = JSON.stringify(params)
    }
  } else {
    options.body = params
    formType = 'blob'
  }

  return send(url, options, formType)
}

export const Get = (url, params, headers) => handleOptions('GET', url, params, headers)

export const Post = (url, params, headers) => handleOptions('POST', url, params, headers)

export const Put = (url, params, headers) => handleOptions('PUT', url, params, headers)

export const Delete = (url, params, headers) => handleOptions('DELETE', url, params, headers)

export const Upload = (url, params, headers) => {
  const formData = new FormData()

  /* eslint-disable-next-line */
  for (const i in params) {
    formData.append(i, params[i])
  }

  return handleOptions('POST', url, formData, headers)
}
