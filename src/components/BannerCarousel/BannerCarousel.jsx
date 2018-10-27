import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'

const IMG_HEIGHT = 156

class BannerCarousel extends Component {
  renderBannerItem = ({ id, title, src }) => {
    return (
      /* eslint-disable-next-line */
      <a 
        key={ id } 
        className='banner-item-container'
        style={{ height: IMG_HEIGHT }}
      >
        <span className='banner-item-title'>{ title }</span>
        <img 
          className='banner-item-image'
          src={ src } 
          alt={ title } 
          onLoad={ () => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'))
          } } 
        />
      </a>
    )
  }

  render() {
    const { list } = this.props

    return (
      <Carousel
        dots={ false }
        autoplay
        infinite
      >
        {list.map(this.renderBannerItem)}
      </Carousel>
    )
  }
}

export default BannerCarousel