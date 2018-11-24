import React, { Component } from 'react'

class UserModule extends Component {
  render() {
    const { userInfo } = this.props
    const { headImgUrl } = userInfo

    return (
      <div className='user-module-container'>
        {/* eslint-disable-next-line */}
        <a className='thumbnail'>
          <img src={ headImgUrl } alt='' />
        </a>
        UserModule
      </div>
    )
  }
}

export default UserModule