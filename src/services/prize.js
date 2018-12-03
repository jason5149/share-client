import { Get } from '@utils/request'
import { API } from '@utils/const'

export const getPrizeList = params => Get(`${ API }/prize/list`, params)

export const getPrizeDetail = params => Get(`${ API }/prize/getPrizeById`, params)