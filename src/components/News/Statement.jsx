import React, { Component } from 'react'

class Statement extends Component {
  render() {
    const { context } = this.props

    return (
      <div className='statement-container'>
        <div className='statement-title'>免责声明</div>
        <div className='statement-desc'>
          {context}
        </div>
      </div>
    )
  }
}

export default Statement