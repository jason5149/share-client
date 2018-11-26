import React, { Component } from 'react'

class ItemLabel extends Component {
  render() {
    const { text } = this.props

    return (
      <span className='item-label'>
        {text}
      </span>
    )
  }
}

export default ItemLabel