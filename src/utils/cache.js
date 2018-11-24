import { 
  setLocalStorage, 
  getLocalStorage, 
  removeLocalStorage, 
  // setSessionStorage,  
  // getSessionStorage,
  // removeSessionStorage,
} from 'pms-saas-common/lib/storage/localStorage'

export const setWxUserInfo = wxUserInfo => setLocalStorage('wxUserInfo', wxUserInfo)
export const getWxUserInfo = () => getLocalStorage('wxUserInfo')
export const removeWxUserInfo = () => removeLocalStorage('wxUserInfo')

export const setUserInfo = userInfo => setLocalStorage('userInfo', userInfo)
export const getUserInfo = () => getLocalStorage('userInfo')
export const removeUserInfo = () => removeLocalStorage('userInfo')

export const setToken = (id, token) => setLocalStorage(`token:${ id }`, token)
export const getToken = id => getLocalStorage(`token:${ id }`)
export const removeToken = id => removeLocalStorage(`token:${ id }`)