import { Get, Post } from '@utils/request'
import { API } from '@utils/const'

export const login = params => Post(`${ API }/user/login`, params)

export const getAddressList = () => Get(`${ API }/user/address/list`)

export const getNewsList = params => Get(`${ API }/news/list`, params)

export const getPrizeList = params => Get(`${ API }/prize/list`, params)