/* eslint no-undef: "off" */
import Wx from 'weixin-js-sdk'

/**
 *  微信第三方授权
 *  @param    {String}    appId
 *  @param    {String}    redirectUri
 *  @param    {String}    type
 *  @param    {String}    payload
 *  @param    {String}    componentAppId
 *  @returns  {Object}
 */
export const wxAuth4Vendor = (appId, redirectUri, type = 'base', payload = null, componentAppId) => {
  if (!appId) return

  let state = ''

  if (payload) {
    if (typeof payload === 'string') {
      state = payload
    } else {
      state = JSON.stringify(payload)
    }
  }

  return {
    appid:           appId,
    redirect_uri:    redirectUri,
    response_type:   'code',
    scope:           type === 'base' ? 'snsapi_base' : 'snsapi_userinfo',
    state,
    component_appid: componentAppId,
  }
}

/**
 *  微信公众号授权
 *  @param    {String}    appId
 *  @param    {String}    redirectUri
 *  @param    {String}    type
 *  @param    {String}    payload
 *  @returns  {Object}
 */
export const wxAuth4Public = (appId, redirectUri, type = 'base', payload = null) => {
  if (!appId) return

  let state = ''

  if (payload) {
    if (typeof payload === 'string') {
      state = payload
    } else {
      state = JSON.stringify(payload)
    }
  }

  return {
    appid:         appId,
    redirect_uri:  redirectUri,
    response_type: 'code',
    scope:         type === 'base' ? 'snsapi_base' : 'snsapi_userinfo',
    state,
  }
}

/**
 *  微信配置
 *  @param    {String}    appId
 *  @param    {String}    timeStamp
 *  @param    {String}    nonceStr
 *  @param    {String}    signature
 *  @param    {Array}     apiList
 *  @returns  {Promise}
 */
export const wxConfig = (appId, timestamp, nonceStr, signature, jsApiList = []) => {
  if (!Wx) return
  if (!appId) return

  return new Promise(resolve => {
    Wx.config({
      // debug: true,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList,
    })
    Wx.ready(() => {
      resolve(true)
    })
    Wx.error(() => {
      resolve(false)
    })
  })
}

/**
 *  微信分享朋友圈
 *  @param    {String}    title
 *  @param    {String}    link
 *  @param    {String}    imgUrl
 *  @returns  {Promise}
 */
export const wxShareTimeline = (title, link, imgUrl) => {
  if (!Wx) return

  return new Promise(resolve => {
    Wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success: () => {
        console.log('wxShareTimeline success')
        resolve(true)
      },
      cancel: () => {
        console.log('wxShareTimeline cancel')
        resolve(false)
      },
    })
  })
}

/**
 *  微信分享给朋友
 *  @param    {String}    title
 *  @param    {String}    desc
 *  @param    {String}    link
 *  @param    {String}    imgUrl
 *  @param    {String}    type
 *  @param    {String}    dataUrl
 *  @returns  {Promise}
 */
export const wxShareAppMessage = (title, desc, link, imgUrl, type = 'link', dataUrl = '') => {
  if (!Wx) return

  return new Promise(resolve => {
    Wx.onShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      type,
      dataUrl,
      success: () => {
        console.log('wxShareAppMessage success')
        resolve(true)
      },
      cancel: () => {
        console.log('wxShareAppMessage cancel')
        resolve(false)
      },
    })
  })
}

/**
 *  微信相册
 *  @param    {String}    type
 *  @returns  {Promise}
 */
export const wxChooseImage = (type = 'album') => {
  if (!Wx) return

  return new Promise(resolve => {
    Wx.chooseImage({
      count:      1,
      sizeType:   ['original', 'compressed'],
      sourceType: [type],
      success:    res => resolve(res),
    })
  })
}

/**
 *  微信预览图片
 *  @param    {String}    currentUrl
 *  @param    {Array}     urls
 */
export const wxPreviewImage = (currentUrl = '', urls = []) => {
  if (!Wx) return

  Wx.previewImage({
    current: currentUrl, // 当前显示图片的http链接
    urls, // 需要预览的图片http链接列表
  })
}

/**
 *  微信查看位置
 *  @param    {Number}    latitude
 *  @param    {Number}    longitude
 *  @param    {Number}    name
 *  @param    {Number}    address
 *  @param    {Number}    scale
 *  @param    {Number}    infoUrl
 *  @returns  {Promise}
 */
export const wxOpenLocation = (latitude = 0, longitude = 0, name = '', address = '', scale = 1, infoUrl = '') => {
  if (!Wx) return

  Wx.openLocation({
    latitude,
    longitude,
    name,
    address,
    scale,
    infoUrl,
  })
}

/**
 *  微信获得地理位置
 *  @param    {String}    type
 *  @returns  {Promise}
 */
export const wxGetLocation = (type = 'wgs84') => {
  if (!Wx) return

  return new Promise(resolve => {
    Wx.getLocation({
      type,
      success: res => resolve(res),
    })
  })
}

/**
 *  微信扫一扫
 *  @param    {Number}    needResult
 *  @returns  {Promise}
 */
export const wxQRCode = (needResult = 1) => {
  if (!Wx) return

  return new Promise(resolve => {
    Wx.scanQRCode({
      needResult,
      scanType: ['qrCode', 'barCode'],
      success:  res => {
        resolve(res.resultStr)
      },
    })
  })
}

/**
 *  微信支付
 *  @param    {String}    timestamp
 *  @param    {String}    nonceStr
 *  @param    {String}    packageId
 *  @param    {String}    paySign
 *  @returns  {Promise}
 */
export const wxPay = (timestamp, nonceStr, packageId, paySign) => {
  if (!Wx) return

  return new Promise(resolve => {
    Wx.chooseWXPay({
      timestamp,
      nonceStr,
      package:  packageId,
      signType: 'MD5',
      paySign,
      success:  res => resolve(res),
    })
  })
}

/**
 *  关闭微信
 */
export const wxCloseWindow = () => {
  if (!Wx) return

  Wx.closeWindow()
}
