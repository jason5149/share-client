import React, { PureComponent } from 'react'
import { Button } from 'antd-mobile'

class Item extends PureComponent {
  render() {
    const { 
      id, 
      title, 
      date,
      author_name,
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
                  赠送阅读数：0
                </span>
                <span className='news-integral-desc'>
                  目标阅读数：3000
                </span>
              </div>
            </div>
            <Button type='warning' size='small'>分享赚积分</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Item