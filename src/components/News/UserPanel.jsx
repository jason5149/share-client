import React, { Component } from 'react'

class UserPanel extends Component {
  render() {
    const { userInfo } = this.props
    const { headImgUrl } = userInfo

    return (
      <div className='user-panel-container'>
        {/* eslint-disable-next-line */}
        <a className='thumbnail'>
          <img src={ headImgUrl } alt='' />
        </a>
      </div>
    )
  }
}

export default UserPanel