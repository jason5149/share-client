import React, { Component } from 'react'

class ActionBtn extends Component {
  render() {
    const { text, onClick } = this.props
    
    return (
      /* eslint-disable-next-line */
      <a className="action-btn" onClick={ onClick }>
        {text}
      </a>
    )
  }
}

export default ActionBtn