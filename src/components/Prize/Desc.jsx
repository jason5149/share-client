import React, { Component } from 'react'

class PrizeDesc extends Component {
  render() {
    const { productName, brand, model, specifications } = this.props
    return (
      <div className='price-desc-container'>
        <div className='price-desc-title'>商品描述</div>
        <ul className='price-spec-container'>
          <li>
            品名：
            {productName}
          </li>
          <li>
            品牌：
            {brand}
          </li>
          <li>
            型号：
            {model}
          </li>
          <li>
            规格：
            {specifications}
          </li>
        </ul>
        <div className='price-desc-title'>商品详情</div>
      </div>
    )
  }
}

export default PrizeDesc