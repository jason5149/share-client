import React, { Component } from 'react'

class NewsContainer extends Component {
  render() {
    const { children } = this.props

    return (
      <div className='my-news-container'>
        {children}
      </div>
    )
  }
}

export default NewsContainer