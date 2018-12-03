import React, { Component } from 'react'

class PrizeImage extends Component {
  render() {
    const { detailImg } = this.props
    const imgList = detailImg.split(',')

    return (
      <ul className='price-image-container'>
        {imgList.map(value => (
          <li key={ value }>
            <img src={ value } alt='' />
          </li>
        ))}
      </ul>
    )
  }
}

export default PrizeImage