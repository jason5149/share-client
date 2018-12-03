import React, { Component } from 'react'

class ActionBtn extends Component {
  render() {
    const { text, type, onClick } = this.props
    
    return (
      /* eslint-disable-next-line */
      <a className={ `action-btn type-${type}` } onClick={ onClick }>
        {text}
      </a>
    )
  }
}

export default ActionBtn