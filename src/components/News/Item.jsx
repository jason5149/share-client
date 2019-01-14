import React, { Component } from 'react'

class NewsItem extends Component {
  render() {
    const { 
      id, 
      date,
      title, 
      integral,
      readCount,
      // shareCount,
      author_name,
      // reprintCount,
      operReadCount,
      thumbnail_pic_s,
      thumbnail_pic_s02,
      thumbnail_pic_s03, 
      onClick,
    } = this.props

    return (
      /* eslint-disable-next-line */
      <div className='news-item-container' onClick={ () => onClick(id) }>
        <div className='news-item-content'>
          <div className='news-item-title'>
            <span className='news-item-integral'>
              +
              {integral || 0}
            </span>
            { title }
          </div>
          <ul className='news-item-thumbnails'>
            <li>
              <img src={ thumbnail_pic_s } alt='' />
            </li>
            <li>
              <img src={ thumbnail_pic_s02 } alt='' />
            </li>
            <li>
              <img src={ thumbnail_pic_s03 } alt='' />
            </li>
          </ul>
          <div className='news-item-info'>
            <div className='news-item-integrals'>
              <div layout='row' layout-align='start center'>
                <span className='news-integral-desc'>
                  {author_name}
                </span>
                <span className='news-integral-desc'>
                  {date}
                </span>
              </div>
              <div layout='row' layout-align='start center'>
                <span className='news-integral-desc'>
                  赠送阅读数：
                  {operReadCount}
                </span>
                <span className='news-integral-desc'>
                  目标阅读数：
                  {readCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem