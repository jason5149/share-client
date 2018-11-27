import React, { Component } from 'react'

class ActionBtn extends Component {
  render() {
    const { onClick } = this.props
    
    return (
      /* eslint-disable-next-line */
      <a className="action-btn" onClick={ onClick }>
        我的分享
      </a>
    )
  }
}

export default ActionBtn