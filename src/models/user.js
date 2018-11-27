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
    userName:  '',
    mobile:    '',
    province:  '',
    city:      '',
    area:      '',
    address:   '',
    isDefault: false,
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

    this.addressInfo = result.body
  }

  changeAddressInfo = (field, value) => {
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
  handleAddressPickAction = (type, address) => {
    if (type === 'cancel') {
      this.toggleAddressModel()
    } else if (type === 'confirm') {
      if (address.length === 3) {
        /* eslint-disable-next-line */
        for (let i = 0, len = address.length; i < len; i++) {
          if (i === 0) {
            this.changeAddressInfo('province', address[i])
          } else if (i === 1) {
            this.changeAddressInfo('city', address[i])
          } else if (i === 2) {
            this.changeAddressInfo('area', address[i])
          }
        }
  
        this.toggleAddressModel()
      }
    }
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