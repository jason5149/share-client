import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getAddressList, getNewsList } from '@services/user'

class UserModel {
  @observable
  addressList = []

  @observable
  addressModalVisible = false

  @observable
  newsListTotal = 0

  @action
  getAddressList = async () => {
    const result = await getAddressList()

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    console.log(result.body)
  }

  @action
  getNewsList = async params => {
    const result = await getNewsList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    if (result.body) {
      this.newsListTotal = result.body.page.totalNum
    }

    return result.body.list
  }

  @action
  toggleAddressModel = () => {
    this.addressModalVisible = !this.addressModalVisible
  }
}

export default new UserModel()