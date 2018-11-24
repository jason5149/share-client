import React, { Component } from 'react'

class ShareInfo extends Component {
  render() {
    const { userInfo } = this.props
    const { nickname } = userInfo
    
    return (
      <div className='share-info-container'>
        <div className='nickname'>{nickname}</div>
      </div>
    )
  }
}

export default ShareInfo