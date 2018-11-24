import React, { Component } from 'react'

class NewsTitle extends Component {
  render() {
    const { title, date, author } = this.props

    return (
      <div className='news-title-container'>
        <div className='title-desc'>
          {title}
        </div>
        <div className='sub-desc'>
          <span>{date}</span>
          <span>{author}</span>
        </div>
      </div>
    )
  }
}

export default NewsTitle