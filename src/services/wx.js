import { API } from '@utils/const'
import { Get } from '@utils/request'

export const getWxConfig = params => Get(`${ API }/wx/createJsapiSignature`, params)

export const getWxUserInfoByCode = params => Get(`${ API }/wx/getWxUserInfoByCode`, params)

export const getTemporaryQrcode = params => Get(`${ API }/wx/getJsapiTicket`, params)