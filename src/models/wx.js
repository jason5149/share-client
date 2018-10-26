import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getWxUserInfoByCode } from '@services/wx'

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
}

export default new WxModel()