import { API } from '@utils/const'
import { Get } from '@utils/request'

export const getWxConfig = params => {
  return Get(`${ API }/wx/createJsapiSignature`, params)
}

export const getWxUserInfoByCode = params => {
  return Get(`${ API }/wx/getWxUserInfoByCode`, params)
}