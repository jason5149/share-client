import React, { Component } from 'react'

class NewsTitle extends Component {
  render() {
    const { title, date, author } = this.props

    return (
      <div className='news-title-container'>
        <div className='title-text'>
          {title}
        </div>
        <div className='sub-text'>
          <span>{date}</span>
          <span>{author}</span>
        </div>
      </div>
    )
  }
}

export default NewsTitle