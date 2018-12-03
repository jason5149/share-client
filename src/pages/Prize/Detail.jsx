import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import BannerCarousel from '@components/BannerCarousel'
import MobileVerify from '@components/MobileVerify'
import Prize from '@components/Prize'

const { PrizePanel, PrizeDesc, PrizeImage, PrizeActions } = Prize

@inject(
  'PrizeModel',
  'UserModel',
)
@observer
class PrizeDetailPage extends Component {
  state = {
    mobileModal: true,
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

    console.log(params)

    getPrizeDetail(params)
  }

  handleActionClick = () => {
    const { UserModel } = this.props
    const { userDetailInfo } = UserModel

    if (!userDetailInfo) return

    const { integral, mobile } = userDetailInfo

    console.log(integral)
    if (!mobile) {
      this.setState({
        mobileModal: false,
      })

      
    }

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
        {mobileModal && <MobileVerify />}
        <PrizeActions 
          integral={ userDetailInfo && userDetailInfo.integral } 
          onClick={ this.handleActionClick } 
        />
      </div>
    )
  }
}

export default PrizeDetailPage