import React, { Component } from 'react'

class ShareDirector extends Component {
  render() {
    const { onClick } = this.props

    return (
      /* eslint-disable-next-line */
      <div className='share-director-container' onClick={ onClick }>
        <i className='share-img' />
      </div>
    )
  }
}

export default ShareDirector