import React, { Component } from 'react'

class UserPanel extends Component {
  render() {
    const { userInfo, templateInfo, onClick } = this.props

    if (!userInfo) return null
    
    const { headImgUrl } = userInfo

    return (
      <div className='user-panel-container'>
        {/* eslint-disable-next-line */}
        <a className='thumbnail'>
          <img src={ headImgUrl } alt='' />
        </a>
        <div style={{ width: '100%' }} layout='column' layout-align='center space-around'>
          <span className='advertisting-text'>{templateInfo && templateInfo.platAd}</span>
          {/* eslint-disable-next-line */}
          <a className='director-text' onClick={ onClick }>{templateInfo && templateInfo.guideAd}</a>
        </div>
      </div>
    )
  }
}

export default UserPanel