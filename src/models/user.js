import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { 
  login,
  sendVcode,
  getUserDetailInfo,
  recordReadAction,
  shareNews,
  getNewsList, 
  getNewsDetail,
  getPrizeList, 
  getAddressList, 
  getAddressInfo,
  createAddress,
  updateAddress,
  deleteAddress,
} from '@services/user'

class UserModel {
  @observable
  newsTabs = [
    { title: '进行中', status: 1 },
    { title: '已完成', status: 2 },
  ]

  @observable
  activedTab = 1

  @observable
  newsListTotal = 0

  @observable
  newsListPageIndex = 1

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
  newsListPageIndex = 1

  @observable
  hasMore = true

  @observable
  prizeListTotal = 0

  @observable
  userDetailInfo = null

  @action
  login = async params => {
    const result = await login(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    return result.body
  }

  @action
  setActivedTab = tab => this.activedTab = tab

  @action
  getUserDetailInfo = async params => {
    const result = await getUserDetailInfo(params)

    if (result.code !== '10000') {
      Toast.show(result.message)
      return
    }

    this.userDetailInfo = result.body
  }

  @action
  sendVcode = async params => {
    const result = await sendVcode(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    return true
  }

  @action
  recordReadAction = async params => {
    const result = await recordReadAction(params)

    if (result.code !== '10000') {
      Toast.show(result.message)
      return
    }

    return true
  }

  @action
  shareNews = async params => {
    const result = await shareNews(params)

    if (result.code !== '10000') {
      Toast.show(result.message)
      return
    }

    return true
  }

  @action
  getNewsList = async params => {
    const result = await getNewsList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    if (!result.body) {
      return false
    }

    this.activedTab = params.status
    this.newsListPageIndex = params.currentPage
    this.newsListTotal = result.body.page.totalNum
    
    if (params.currentPage >= result.body.page.totalPage) {
      this.hasMore = false

      if (params.currentPage === 1) {
        return result.body.list
      } else {
        return false
      }
    } else {
      this.hasMore = true

      return result.body.list
    }
  }

  @action
  getNewsDetail = async params => {
    const result = await getNewsDetail(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    this.newsDetail = result.body

    return true
  }

  @action
  getPrizeList = async params => {
    const result = await getPrizeList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    if (result.body) {
      this.prizeListTotal = result.body.page.totalNum
    }

    return result.body.list
  }

  @action
  getAddressList = async () => {
    const result = await getAddressList()

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    this.addressList = result.body
  }

  @action
  getAddressInfo = async params => {
    const result = await getAddressInfo(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    this.addressInfo = result.body
  }

  @action
  changeAddressInfo = (field, value) => {
    this.addressInfo[field] = value
  }

  @action
  createAddress = async params => {
    const result = await createAddress(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    return true
  }

  @action
  updateAddress = async params => {
    const result = await updateAddress(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    return true
  }

  @action
  deleteAddress = async params => {
    const result = await deleteAddress(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
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
}

export default new UserModel()