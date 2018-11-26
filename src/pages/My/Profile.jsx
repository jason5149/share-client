import React, { Component } from 'react'
import { WhiteSpace, List } from 'antd-mobile'
import ItemLabel from '@components/ItemLabel'
import ProfilePanel from '@components/ProfilePanel'
import { getWxUserInfo } from '@utils/cache'
import { BASE_PATH } from '@utils/const'

const { Item } = List

class MyProfilePage extends Component {
  state = {
    wxUserInfo: getWxUserInfo(),
  }

  handleItemClick = type => {
    const { history } = this.props

    if (type === 'address') {
      history.push(`${ BASE_PATH }/my/address`)  
    }
  }

  render() {
    const { wxUserInfo } = this.state

    return (
      <div className='view-container'>
        <ProfilePanel userInfo={ wxUserInfo } />
        <WhiteSpace />
        <List>
          <Item arrow='horizontal' onClick={ () => this.handleItemClick('misson') }>
            <ItemLabel text='我的任务' />
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