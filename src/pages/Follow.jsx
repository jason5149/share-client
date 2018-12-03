import React, { Component } from 'react'

class FollowPage extends Component {
  componentDidMount() {
    document.title = '关注二维码'
  }
  
  render() {
    return (
      <div layout='row' layout-align='center center'>
        关注二维码
      </div>
    )
  }
}

export default FollowPage