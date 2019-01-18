import React, { Component } from 'react'

class ProfilePanel extends Component {
  render() {
    const { userInfo, integral, shareCount, shareReadCount, personalRate } = this.props
    const { headImgUrl } = userInfo

    return (
      <div className='profile-panel-container'>
        {/* eslint-disable-next-line */}
        <a className='profile-thumbnail'>
          <img src={ headImgUrl } alt='' />
        </a>
        <span className='profile-integral'>
          积分：
          {integral}
        </span>
        <ul className='profile-info-summary'>
          <li>
            <span className='profile-info-title'>总阅读</span>
            <span className='profile-info-desc'>
              {shareReadCount}
              次
            </span>
          </li>
          <li>
            <span className='profile-info-title'>总转载</span>
            <span className='profile-info-desc'>
              {shareCount}
              次
            </span>
          </li>
          <li>
            <span className='profile-info-title'>超越全国用户</span>
            <span className='profile-info-desc'>
              {personalRate}
              %
            </span>
          </li>
        </ul>
      </div>
    )
  }
}

export default ProfilePanel