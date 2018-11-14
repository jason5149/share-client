import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { 
  login,
  getAddressList, 
  getAddressInfo,
  createAddress,
  updateAddress,
  deleteAddress,
  getNewsList, 
  getPrizeList, 
} from '@services/user'

class UserModel {
  @observable
  addressList = []

  @observable
  addressInfo = {
    userName: '',
    mobile:   '',
    province: '',
    city:     '',
    area:     '',
    address:  '',
    default:  false,
  }

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

    this.addressList = result.body
  }

  @action
  getAddressInfo = async params => {
    const result = await getAddressInfo(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    // return result.body
    this.addressInfo = result.body
  }

  changeAddressInfo = (field, value) => {
    console.log(field, value)
    this.addressInfo[field] = value
  }

  @action
  createAddress = async params => {
    const result = await createAddress(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    return true
  }

  @action
  updateAddress = async params => {
    const result = await updateAddress(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    return true
  }

  @action
  deleteAddress = async params => {
    const result = await deleteAddress(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    return true
  }

  @action
  toggleAddressModel = () => {
    this.addressModalVisible = !this.addressModalVisible
  }

  @action
  getNewsList = async params => {
    Toast.loading('加载中')

    const result = await getNewsList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    if (result.body) {
      this.newsListTotal = result.body.page.totalNum
    }

    Toast.hide()

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