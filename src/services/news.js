import { Get } from '@utils/request'
import { API } from '@utils/const'

export const getNewsList = params => Get(`${ API }/news/list`, params)

export const getNewsDetail = params => Get(`${ API }/news/getNewsById`, params)