import React, { PureComponent } from 'react'

class Panel extends PureComponent {
  render() {
    const { userInfo } = this.props
    const { headImgUrl } = userInfo

    return (
      <div className='profile-panel-container'>
        {/* eslint-disable-next-line */}
        <a className='profile-thumbnail'>
          <img src={ headImgUrl } alt='' />
        </a>
        <span className='profile-integral'>
          积分：89
        </span>
        <ul className='profile-info-summary'>
          <li>
            <span className='profile-info-title'>总阅读</span>
            <span className='profile-info-desc'>0次</span>
          </li>
          <li>
            <span className='profile-info-title'>总转载</span>
            <span className='profile-info-desc'>3300次</span>
          </li>
          <li>
            <span className='profile-info-title'>超越全国用户</span>
            <span className='profile-info-desc'>57%</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Panel