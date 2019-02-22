import React, { Component } from 'react'
import { Button } from 'antd-mobile'

class PrizeActions extends Component {
  render() {
    const { integral, onClick } = this.props

    return (
      <div className='price-actions-container'>
        <span className='price-actions-text'>
          所需积分：
          {integral}
        </span>
        {/* <Button type='warning' disabled={ integral === 0 } onClick={ onClick }>我要兑换</Button> */}
        <Button type='warning' onClick={ onClick }>我要兑换</Button>
      </div>
    )
  }
}

export default PrizeActions