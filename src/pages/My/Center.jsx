import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { WhiteSpace, List } from 'antd-mobile'
import { AsyncComponent } from 'pms-saas-component'
import { getWxUserInfo } from '@utils/cache'
import { BASE_PATH } from '@utils/const'

const { Item } = List

const ProfilePanel = AsyncComponent(() => import('@components/ProfilePanel'))

@inject(
  'UserModel',
)
@observer
class MyCenterPage extends Component {
  state = {
    userInfo: getWxUserInfo(),
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的'
  }

  handleMissionClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my/news`)
  }

  handlePrizeClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my/prize`)
  }

  handleAddressClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my/address`)
  }

  render() {
    const { userInfo } = this.state

    return (
      <div className='page-container'>
        <ProfilePanel 
          userInfo={ userInfo }
          onPrizeClick={ this.handlePrizeClick }
          onAddressClick={ this.handleAddressClick }
        />
        <WhiteSpace />
        <List>
          <Item arrow='horizontal' onClick={ this.handleMissionClick }>我的任务</Item>
          <Item arrow='horizontal' onClick={ this.handlePrizeClick }>我的奖品</Item>
        </List>
        <WhiteSpace />
        <List>
          <Item arrow='horizontal' onClick={ this.handleAddressClick }>收货地址</Item>
        </List>
      </div>
    )
  }
}

export default MyCenterPage