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
        <div layout='row' layout-align='center center'>
          <span>广告语</span>
          {/* eslint-disable-next-line */}
          <a onClick={ onClick }>引导语</a>
        </div>
      </div>
    )
  }
}

export default UserPanel