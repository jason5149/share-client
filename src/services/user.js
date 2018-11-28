import { Get, Post, Put, Delete } from '@utils/request'
import { API } from '@utils/const'

export const login = params => Post(`${ API }/user/login`, params)

export const recordReadAction = params => Put(`${ API }/news/read`, params)

export const getNewsList = params => Get(`${ API }/news/myShare`, params)

export const getPrizeList = params => Get(`${ API }/prize/list`, params)

export const getAddressList = () => Get(`${ API }/user/address/list`)

export const getAddressInfo = id => Get(`${ API }/user/address/${ id }`)

export const createAddress = params => Post(`${ API }/user/address`, params)

export const updateAddress = params => Put(`${ API }/user/address`, params)

export const deleteAddress = params => Delete(`${ API }/user/address`, params)