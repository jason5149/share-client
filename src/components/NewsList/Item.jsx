import React, { PureComponent } from 'react'

class Item extends PureComponent {
  render() {
    const { 
      id, 
      title, 
      thumbnail_pic_s,
      thumbnail_pic_s02,
      thumbnail_pic_s03, 
    } = this.props

    return (
      <div 
        key={ id }
        className='news-item-container'
      >
        <div className='news-item-content'>
          <div className='news-item-title'>
            {title}
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
        </div>
      </div>
    )
  }
}

export default Item