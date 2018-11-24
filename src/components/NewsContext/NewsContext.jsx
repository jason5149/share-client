import React, { Component } from 'react'

class NewsContext extends Component {
  render() {
    const { context, readCount, shareCount } = this.props

    return (
      <div className='news-context-container'>
        {/* eslint-disable-next-line */}
        {context && 
          <div dangerouslySetInnerHTML={{ __html: context }} />
        }
        <div className='news-context-actions'>
          <span>
              阅读：
            {readCount}
          </span>
          <span>
              转载：
            {shareCount}
          </span>
        </div>
      </div>
    )
  }
}

export default NewsContext