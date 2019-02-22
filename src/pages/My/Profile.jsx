import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { WhiteSpace, List } from 'antd-mobile'
import ItemLabel from '@components/ItemLabel'
import ProfilePanel from '@components/ProfilePanel'
import { getWxUserInfo } from '@utils/cache'
import { BASE_PATH } from '@utils/const'

const { Item } = List

@inject(
  'UserModel',
)
@observer
class MyProfilePage extends Component {
  state = {
    wxUserInfo: getWxUserInfo(),
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的'

    this.handleSearchUserInfo()
  }

  handleSearchUserInfo = () => {
    const { UserModel } = this.props
    const { getUserDetailInfo } = UserModel

    getUserDetailInfo()
  }

  handleItemClick = type => {
    const { history } = this.props

    if (type === 'address') {
      history.push(`${ BASE_PATH }/my/address`)  
    } else if (type === 'share') {
      history.push(`${ BASE_PATH }/my/share`)  
    } else if (type === 'prize') {
      history.push(`${ BASE_PATH }/my/prize`)  
    } 
  }

  render() {
    const { UserModel } = this.props
    const { wxUserInfo } = this.state
    const { userDetailInfo } = UserModel

    return (
      <div className='view-container'>
        <ProfilePanel 
          userInfo={ wxUserInfo } 
          integral={ userDetailInfo && userDetailInfo.integral } 
          shareReadCount={ userDetailInfo && userDetailInfo.shareReadCount }
          shareReprintCount={ userDetailInfo && userDetailInfo.shareReprintCount } 
          personalRate={ userDetailInfo && userDetailInfo.personalRate }
        />
        <WhiteSpace />
        <List>
          <Item arrow='horizontal' onClick={ () => this.handleItemClick('share') }>
            <ItemLabel text='我的分享' />
          </Item>
          <Item arrow='horizontal' onClick={ () => this.handleItemClick('prize') }>
            <ItemLabel text='我的奖品' />
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item arrow='horizontal' onClick={ () => this.handleItemClick('address') }>
            <ItemLabel text='收货地址' />
          </Item>
        </List>
      </div>
    )
  }
}

export default MyProfilePage