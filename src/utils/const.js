export const BASE_PATH = process.env.NODE_ENV === 'development' ? '' : '/client'
export const API = '/share-wx'
export const WX_APP_ID = 'wx3eac30be170e9190'
export const REDIRECT_URL = process.env.NODE_ENV === 'development' ? 'http://dev.tangjc.com/client/auth/' : 'http://dev.tangjc.com/client/auth/'