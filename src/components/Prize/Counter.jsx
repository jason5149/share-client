import React, { Component } from 'react'
import { InputItem } from 'antd-mobile'

class PrizeCounter extends Component {
  handleActionClick = type => {
    const { count, maxCount, onAction } = this.props

    if (type === 'minus') {
      if (count <= 0) return

      onAction(type)
    } else if (type === 'plus') {
      if (count >= maxCount) return

      onAction(type)
    }
  }

  render() {
    const { count = 0, maxCount, onChange } = this.props

    return (
      <div className='prize-counter-container'>
        <span style={{ whiteSpace: 'nowrap' }}>数量：</span>
        {/* eslint-disable-next-line */}
        <span className={ `prize-counter-desc ${count <= 0 ? 'disabled' : ''}` } onClick={ () => this.handleActionClick('minus') }>-</span>
        <InputItem type='number' value={ count } onChange={ value => onChange(value) } />
        {/* eslint-disable-next-line */}
        <span className={ `prize-counter-desc ${count >= maxCount ? 'disabled' : ''}` } onClick={ () => this.handleActionClick('plus') }>+</span>
      </div>
    )
  }
}

export default PrizeCounter