import React, { Component } from 'react'

class UserPanel extends Component {
  render() {
    const { userInfo, onClick } = this.props
    const { headImgUrl } = userInfo

    return (
      <div className='user-panel-container'>
        {/* eslint-disable-next-line */}
        <a className='thumbnail'>
          <img src={ headImgUrl } alt='' />
        </a>
        <div style={{ width: '100%' }} layout='column' layout-align='center space-around'>
          <span className='advertisting-text'>广告语</span>
          {/* eslint-disable-next-line */}
          <a className='director-text' onClick={ onClick }>引导语</a>
        </div>
      </div>
    )
  }
}

export default UserPanel