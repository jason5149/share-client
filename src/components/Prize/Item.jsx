import React, { Component } from 'react'

class PrizeItem extends Component {
  render() {
    const { 
      id, 
      coverImg,
      name,
      model,
      convertibility,
      surplusStock,
      marketPrice,
      onClick,
    } = this.props

    return (
      /* eslint-disable-next-line */
      <div className='prize-item-container' onClick={ () => onClick(id) }>
        <img className='prize-item-thumbnail' src={ coverImg } alt='' />
        <div className='prize-item-info'>
          <div layout='column' layout-align='center start'>
            <span className='prize-item-text'>{name}</span>
            <span className='prize-item-text'>{model}</span>
          </div>
          <div layout='column' layout-align='center start'>
            <div layout='row' layout-align='start center'>
              <div className='prize-item-spec'>
                积分：
                {convertibility}
              </div>
              <div className='prize-item-sub'>
                剩余库存：
                {surplusStock || 0}
              </div>
            </div>
            <span className='prize-item-sub'>
              市场参考价：
              {marketPrice / 100}
              元
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default PrizeItem