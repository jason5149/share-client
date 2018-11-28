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

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的'
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
    const { wxUserInfo } = this.state

    return (
      <div className='view-container'>
        <ProfilePanel userInfo={ wxUserInfo } />
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