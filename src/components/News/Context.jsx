import React, { Component } from 'react'

class NewsContext extends Component {
  render() {
    const { context, readCount, shareCount } = this.props

    return (
      <div className='news-context-container'>
        {context && <div dangerouslySetInnerHTML={{ __html: context }} />}
        <div className='news-context-actions'>
          <span>
            <i className='read-icon' />
            阅读：
            {readCount}
          </span>
          <span>
            <i className='share-icon' />
            转载：
            {shareCount}
          </span>
        </div>
      </div>
    )
  }
}

export default NewsContext