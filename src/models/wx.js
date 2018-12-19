import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { 
  getWxUserInfoByCode, 
  getWxConfig, 
  getTemporaryQrcode,
  getStaticQrcode,
} from '@services/wx'

class WxModel {
  @observable
  wxUserInfo = null

  @action
  getWxUserInfoByCode = async params => {
    const result = await getWxUserInfoByCode(params)

    if (result.code !== '10000') {
      Toast.show(result.message)
      return false
    }

    return result.body
  }

  @action
  getWxConfig = async params => {
    const result = await getWxConfig(params)

    if (result.code !== '10000') {
      Toast.show(result.message)
      return false
    }

    return result.body
  }

  @action
  getTemporaryQrcode = async params => {
    const result = await getTemporaryQrcode(params)

    if (result.code !== '10000') {
      Toast.show(result.message)
      return
    }
    
    return result.body
  }

  @action
  getStaticQrcode = async params => {
    const result = await getStaticQrcode(params)

    if (result.code !== '10000') {
      Toast.show(result.message)
      return
    }
    
    return result.body
  }
}

export default new WxModel()