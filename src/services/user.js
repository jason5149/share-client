import { Get } from '@utils/request'
import { API } from '@utils/const'

export const getAddressList = () => Get(`${ API }/user/address/list`)

export const getNewsList = params => Get(`${ API }/news/list`, params)