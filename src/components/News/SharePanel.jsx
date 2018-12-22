import React, { Component } from 'react'
import { Button } from 'antd-mobile'

class SharePanel extends Component {
  render() {
    const { userInfo, templateInfo, onClick } = this.props

    if (!userInfo) return null

    const { nickName, shareCount, shareReadCount, prizeCount } = userInfo

    return (
      <div className='share-panel-container'>
        <div className='share-username'>
          {nickName}
        </div>
        <div className='share-info'>
          <div className='share-line-info'>
            <span className='share-info-text'>
              分享热文：
              {shareCount}
              次
            </span>
            <span className='share-info-text'>
              领取奖品：
              {prizeCount}
              次
            </span>
          </div>
          <div className='share-info-text'>
            分享过的热文被
            {shareReadCount}
            人查看过
          </div>
        </div>
        <div className='share-desc'>
          <span>{templateInfo && templateInfo.shareAd}</span>
          <img src={ templateInfo && templateInfo.businessFlow } alt='' />
          <div style={{ width: '100%' }} layout='row' layout-align='end center'>
            <Button type='warning' size='small' onClick={ onClick }>{templateInfo && templateInfo.buttonName}</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SharePanel