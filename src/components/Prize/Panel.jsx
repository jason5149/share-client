import React, { Component } from 'react'

class PrizePanel extends Component {
  render() {
    const { name, convertibility, marketPrice, surplusStock } = this.props

    return (
      <div className='prize-panel-container'>
        <div className='prize-name'>{name}</div>
        <div className='prize-integrals'>
          <span>
            积分：
            {convertibility}
          </span>
          <span>
            剩余库存：
            {surplusStock}
          </span>
        </div>
        <div className='prize-value'>
          市场参考价：
          {(marketPrice / 100).toFixed(2)}
          元
        </div>
      </div>
    )
  }
}

export default PrizePanel