import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import Address from '@components/Address'
import Prize from '@components/Prize'
import { BASE_PATH } from '@utils/const'
import { base64decode } from '@utils/tool'

const { AddressPicker } = Address
const { PrizeConfirmation, PrizeActions } = Prize

@inject(
  'UserModel',
  'PrizeModel',
)
@observer
class PrizeExchangePage extends Component {
  state = {
    count:          1,
    defaultAddress: null,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '奖品兑换'

    const { history } = this.props
    const { location } = history
    const { search } = location

    if (search) {
      /* eslint-disable-next-line */
      const params = new URLSearchParams(search)
      const defaultAddress = params.get('address') ? base64decode(params.get('address')) : null

      this.setState({
        defaultAddress,
      })
    }

    this.handleSearchUserInfo()
    this.handleSearchAddressList()
    this.handleSearchPrizeDetail()
  }

  handleSearchUserInfo = () => {
    const { UserModel } = this.props
    const { getUserDetailInfo } = UserModel

    getUserDetailInfo()
  }

  handleSearchAddressList = async () => {
    const { UserModel } = this.props
    const { getAddressList } = UserModel

    const result = await getAddressList()

    if (result) {
      const defaultAddress = this.handleSearchDefaultAddress(result)

      this.setState({
        defaultAddress,
      })
    }
  }

  handleSearchPrizeDetail = () => {
    const { PrizeModel, match } = this.props
    const { getPrizeDetail } = PrizeModel
    const { params } = match

    getPrizeDetail(params)
  }

  handleAddressPickerClick = () => {
    const { history, location } = this.props
    const { pathname } = location

    const url = pathname

    history.push(`${ BASE_PATH }/my/address?chooseAddress=true&fromTarget=${ url }`)
  }

  handleSearchDefaultAddress = list => {
    let result

    if (list.length > 0) {
      /* eslint-disable-next-line */
      result = list.filter(value => {
        if (value.isDefault !== 0) {
          return value
        }
      })[0]
    }

    if (!result) {
      /* eslint-disable-next-line */
      result = list[0]
    }
    
    return result
  }

  handleActionClick = async() => {
    const { history, UserModel, PrizeModel } = this.props
    const { count, defaultAddress } = this.state
    const { userDetailInfo } = UserModel
    const { prizeDetail, exchangePrize } = PrizeModel
    const { id: userId, integral } = userDetailInfo
    const { id: prizeId, convertibility } = prizeDetail

    if (!defaultAddress) {
      Toast.show('请选择收货地址')
      return
    }

    const { id: userAddressId } = defaultAddress

    if (count <= 0) {
      Toast.show('请确认兑换的商品数量')
      return
    }
    if ((convertibility * count) > integral) {
      Toast.show('您的积分不够兑换')
      return
    }

    const params = {
      prizeCount: count,
      prizeId,
      userAddressId,
      userId,
    }
    const result = await exchangePrize(params)

    if (result) {
      Toast.show('兑换成功')

      setTimeout(() => {
        history.push(`${ BASE_PATH }/prize`)
      }, 200)
    }
  }

  handleCountAction = type => {
    let { count } = this.state

    if (type === 'plus') {
      this.setState({
        count: ++count,
      })
    } else {
      this.setState({
        count: --count,
      })
    }
  }

  handleCountChange = value => {
    const { PrizeModel } = this.props
    const { prizeDetail } = PrizeModel
    const { surplusStock } = prizeDetail

    if (value > surplusStock) {
    // if (value > 100) {
      this.setState({
        count: surplusStock,
        // count: 100,
      })
    } else if (value <= 0) {
      this.setState({
        count: 1,
      })
    } else {
      this.setState({
        count: value,
      })
    }
  }

  render() {
    const { PrizeModel } = this.props
    const { count, defaultAddress } = this.state
    // const { userDetailInfo } = UserModel
    const { prizeDetail } = PrizeModel

    if (!prizeDetail) return null

    const { convertibility } = prizeDetail

    return (
      <div className='view-container'>
        <div className='prize-detail-container'>
          <AddressPicker { ...defaultAddress } onClick={ this.handleAddressPickerClick } />
          <PrizeConfirmation 
            { ...prizeDetail } 
            count={ count }
            onAction={ this.handleCountAction }
            onChange={ this.handleCountChange }
          />
        </div>
        <PrizeActions 
          type={ 2 }
          integral={ count > 0 ? convertibility * count : 0 } 
          onClick={ this.handleActionClick }
        />
      </div>
    )
  }
}

// {"id":2,"tradeNo":"20195022000002","openid":"owzYd1Mz9ualgzcuZ5crCSmtaH1s","headImgUrl":"http://thirdwx.qlogo.cn/mmopen/1ybFUCEophZiao9B2ft6mCdQsOxBfVdFOezu9XoticIhMItLK7sibx6fpCLbbyosJecR1fRAopUPfFeRoC419Ezk8dsTXCNyBI6/132","nickName":"Jason","sex":1,"country":"中国","province":"上海","city":"杨浦","mobile":null,"firstFollowTime":1550821808588,"lastFollowTime":null,"cancelFollowTime":null,"location":null,"createTime":null,"token":"B3966247477BCDA0DB8304E1A2F50668","shareCount":null,"prizeCount":null,"shareReadCount":null,"shareReprintCount":null,"integral":null,"doingJobCount":null,"finishedJobCount":null,"partnerId":null,"personalRate":null}
// {"subscribe":null,"openId":"owzYd1Mz9ualgzcuZ5crCSmtaH1s","nickname":"Jason","sexDesc":"男","sex":1,"language":"zh_CN","city":"杨浦","province":"上海","country":"中国","headImgUrl":"http://thirdwx.qlogo.cn/mmopen/vi_32/IhGBSrcPDYxpuib46cyT3CpnEwNOUMib2tbEYYxcACLGIiaibWz76diaqbmOzSK7fe9BaQ4VZcVvPAVpl0H557X6YTA/132","subscribeTime":null,"unionId":null,"remark":null,"groupId":null,"tagIds":null,"privileges":[],"subscribeScene":null,"qrScene":null,"qrSceneStr":null}

export default PrizeExchangePage