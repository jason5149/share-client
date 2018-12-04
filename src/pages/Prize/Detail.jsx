import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import BannerCarousel from '@components/BannerCarousel'
import MobileVerify from '@components/MobileVerify'
import Prize from '@components/Prize'
import { BASE_PATH } from '@utils/const'

const { PrizePanel, PrizeDesc, PrizeImage, PrizeActions } = Prize

@inject(
  'PrizeModel',
  'UserModel',
)
@observer
class PrizeDetailPage extends Component {
  state = {
    mobileModal: false,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '奖品详情'

    this.handleSearchUserInfo()
    this.handleSearchPrizeDetail()
  }

  handleSearchUserInfo = () => {
    const { UserModel } = this.props
    const { getUserDetailInfo } = UserModel

    getUserDetailInfo()
  }

  handleSearchPrizeDetail = () => {
    const { PrizeModel, match } = this.props
    const { getPrizeDetail } = PrizeModel
    const { params } = match

    getPrizeDetail(params)
  }

  handleActionClick = () => {
    const { history, UserModel } = this.props
    const { userDetailInfo } = UserModel

    if (!userDetailInfo) return

    const { integral, mobile } = userDetailInfo

    if (!integral) {
      Toast.show('您的积分不足', 1)
      return
    }
    if (!mobile) {
      this.setState({
        mobileModal: true,
      })
      return
    }

    history.push(`${ BASE_PATH }/exchange`)
  }

  handleBindConfirm = params => {
    console.log(params)
  }

  handleBindCancel = () => {
    this.setState({
      mobileModal: false,
    })
  }

  render() {
    const { PrizeModel, UserModel } = this.props
    const { mobileModal } = this.state
    const { prizeDetail } = PrizeModel
    const { userDetailInfo } = UserModel

    if (!prizeDetail) return null

    const { bannerImg } = prizeDetail

    const bannerList = bannerImg.split(',').map((value, index) => {
      return {
        id:    index + 1,
        image: value,
        url:   '',
      }
    })

    return (
      <div className='view-container'>
        <div className='prize-detail-container'>
          <BannerCarousel list={ bannerList } />
          <PrizePanel { ...prizeDetail } />
          <PrizeDesc { ...prizeDetail } />
          <PrizeImage { ...prizeDetail } />
        </div>
        {mobileModal && <MobileVerify onConfirm={ this.handleBindConfirm } onCancel={ this.handleBindCancel } />}
        <PrizeActions 
          integral={ userDetailInfo && userDetailInfo.integral } 
          onClick={ this.handleActionClick } 
        />
      </div>
    )
  }
}

export default PrizeDetailPage