/**
 * 保存LocalStorage
 * @param    {String}    key
 * @param    {String}    value
 */
export const setLocalStorage = (key, value = '') => {
  if (!key || !value) return

  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取LocalStorage
 * @param    {String}    key
 * @returns  {Object|String}
 */
export const getLocalStorage = key => {
  if (!key) return

  const value = localStorage.getItem(key)

  if (value) {
    return JSON.parse(value)
  }

  return ''
}

/**
 * 删除LocalStorage
 * @param    {String}
 */
export const removeLocalStorage = key => {
  if (!key) return

  localStorage.removeItem(key)
}

/**
 * 删除全部LocalStorage
 */
export const removeAllLocalStorage = () => {
  localStorage.clear()
}


/**
 * 保存SessionStorage
 * @param    {String}    key
 * @param    {String}    value
 */
export const setSessionStorage = (key, value = '') => {
  if (!key || !value) return

  sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取SessionStorage
 * @param    {String}    key
 * @returns  {Object|String}
 */
export const getSessionStorage = key => {
  if (!key) return

  const value = sessionStorage.getItem(key)

  if (value) {
    return JSON.parse(value)
  }

  return ''
}

/**
 * 删除SessionStorage
 * @param    {String}
 */
export const removeSessionStorage = key => {
  if (!key) return

  sessionStorage.removeItem(key)
}

/**
 * 删除全部SessionStorage
 */
export const removeAllSessionStorage = () => {
  sessionStorage.clear()
}

/**
 * 设置缓存
 * @param    {String}    key
 * @param    {String}    value
 * @param    {Number}    expireTime    多少时间后自动过期，默认0秒，也就是不过期
 */
export const setCacheStorage = (key, value, expireTime = 0) => {
  if (!key) return
  /* eslint-disable-next-line */
  if (isNaN(expireTime)) return

  const val = value
  let time

  if (expireTime > 0) {
    time = (new Date().getTime() - 1) + (expireTime * 1000)
  } else {
    time = expireTime
  }

  setLocalStorage(key, { val, time })
}

/**
 * 清除缓存
 * @param    {String}    key
 */
export const removeCacheStorage = key => {
  if (!key) return

  removeLocalStorage(key)
}


/**
 * 获取缓存
 * @param    {String}    key
 * @returns  {Object}
 */
export const getCacheStorage = key => {
  if (!key) return

  const cacheValue = getLocalStorage(key)
  if (!cacheValue) return

  const currentTime = new Date() - 1

  if (cacheValue.time <= 0) {
    return cacheValue.val
  } else {
    if (currentTime > cacheValue.time) {
      removeCacheStorage(key)
      return
    }

    return cacheValue.val
  }
}

/**
 * 删除全部缓存
 */
export const clearCacheStorage = () => {
  removeAllLocalStorage()
}
