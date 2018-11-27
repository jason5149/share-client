import React, { Component } from 'react'
import { Button } from 'antd-mobile'

class SharePanel extends Component {
  render() {
    const { userInfo } = this.props
    const { nickname } = userInfo

    return (
      <div className='share-panel-container'>
        <div className='share-username'>
          {nickname}
        </div>
        <div className='share-info'>
          <div className='share-line-info'>
            <span className='share-info-text'>分享热文：次</span>
            <span className='share-info-text'>领取奖品：次</span>
          </div>
          <div className='share-info-text'>分享过的热文被1000人查看过</div>
        </div>
        <div className='share-desc'>
          <span>分享越多礼品越多，亿分享“壕”礼不停送</span>
          <img src='' alt='' />
          <div style={{ width: '100%' }} layout='row' layout-align='end center'>
            <Button type='warning' size='small'>我来分享</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SharePanel