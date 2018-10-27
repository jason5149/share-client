import { Get } from '@utils/request'
import { API } from '@utils/const'

export const getNewsList = params => Get(`${ API }/news/list`, params)