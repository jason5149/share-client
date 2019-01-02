import { Get, Post, Put, Delete } from '@utils/request'
import { API } from '@utils/const'

export const login = params => Post(`${ API }/user/login`, params)

export const sendVcode = params => Get(`${ API }/common/send`, params)

export const bindUserMobile = params => Post(`${ API }/user/updateUserMobile`, params)

export const getUserDetailInfo = params => Get(`${ API }/user/getUserById`, params)
// export const getUserDetailInfo = params => Post(`${ API }/user/getUserById`, params)

export const recordReadAction = params => Post(`${ API }/news/read`, params)

export const shareNews = params => Post(`${ API }/news/share`, params)

export const getNewsList = params => Get(`${ API }/news/myShare`, params)

export const getPrizeList = params => Get(`${ API }/prize/exchange/list`, params)

export const getIntegralList = params => Get(`${ API }/user/intergra/list`, params)

export const getAddressList = () => Get(`${ API }/user/address/list`)

export const getAddressInfo = id => Get(`${ API }/user/address/${ id }`)

export const createAddress = params => Post(`${ API }/user/address`, params)

export const updateAddress = params => Put(`${ API }/user/address`, params)

export const deleteAddress = params => Delete(`${ API }/user/address`, params)
