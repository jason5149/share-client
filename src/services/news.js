import { Get, Post } from '@utils/request'
import { API } from '@utils/const'

export const getNewsList = params => Get(`${ API }/news/list`, params)

export const getNewsTemplate = params => Get(`${ API }/common/selectGuideById`, params)

export const getNewsDetail = params => Get(`${ API }/news/getNewsById`, params)

export const shareNews = params => Post(`${ API }/news/share`, params)