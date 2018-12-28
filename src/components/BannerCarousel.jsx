import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'

const IMG_HEIGHT = 156

class BannerCarousel extends Component {
  renderBannerItem = ({ id, title, image, url }) => {
    const { onClick } = this.props
    
    return (
      /* eslint-disable-next-line */
      <a 
        key={ id } 
        className='banner-item-container'
        style={{ height: IMG_HEIGHT }}
        onClick={ () => onClick(url) }
      >
        {/* <span className='banner-item-title'>{ title }</span> */}
        <img 
          className='banner-item-image'
          src={ image } 
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
      <div className='banner-carousel-container'>
        <Carousel
          dots={ false }
          autoplay
          infinite
        >
          {list.map(this.renderBannerItem)}
        </Carousel>
      </div>
    )
  }
}

export default BannerCarousel