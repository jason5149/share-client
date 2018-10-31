import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { 
  login,
  getAddressList, 
  getNewsList, 
  getPrizeList, 
} from '@services/user'

class UserModel {
  @observable
  addressList = []

  @observable
  addressModalVisible = false

  @observable
  newsListTotal = 0

  @observable
  prizeListTotal = 0

  @action
  login = async params => {
    const result = await login(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    return result.body
  }

  @action
  getAddressList = async () => {
    const result = await getAddressList()

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    // this.addressList = result.body
  }

  @action
  toggleAddressModel = () => {
    this.addressModalVisible = !this.addressModalVisible
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
  getPrizeList = async params => {
    const result = await getPrizeList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    if (result.body) {
      this.prizeListTotal = result.body.page.totalNum
    }

    return result.body.list
  }
}

export default new UserModel()