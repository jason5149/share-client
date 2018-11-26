import React, { Component } from 'react'

class NewsItem extends Component {
  render() {
    // const { id } = this.props

    console.log(this.props)

    return (
      <div className='news-item-container'>
        <div className='news-item-content'>
          NewsItem
        </div>
      </div>
    )
  }
}

export default NewsItem