import React, { PureComponent } from 'react'

class Item extends PureComponent {
  render() {
    const { id, src } = this.props

    return (
      <div key={ id } className='prize-item-container'>
        <div className='prize-item-content'>
          <img src={ src } alt='' />
          <ul className='prize-item-infos'>
            <li className='prize-item-title'>商品1</li>
            <li className='prize-item-desc'>商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述</li>
            <li layout='row' layout-align='start center'>
              <span className='prize-item-integral'>积分：30</span>
              <span className='prize-item-stock'>剩余库存：999</span>
            </li>
            <li className='prize-item-value'>市场参考价：300.00元</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Item