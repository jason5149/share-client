import React, { Component } from 'react'
import PrizeCounter from './Counter'

class PrizeConfirmation extends Component {
  render() {
    const { 
      name, 
      brand, 
      count,
      surplusStock,
      model,
      coverImg,
      convertibility,
      specifications,
      onAction,
      onChange,
    } = this.props

    return (
      <div className='prize-confirmation-container'>
        <div className='prize-brand'>{brand}</div>
        <div className='prize-detail'>
          <img className='thumbnail' src={ coverImg } alt='' />
          <div style={{ width: '100%', height: '100%' }} layout='column' layout-align='start center'>
            <div className='prize-name'>{name}</div>
            <ul className='prize-infos'>
              <li>
                型号：
                {model}
              </li>
              <li>
                规格：
                {specifications}
              </li>
              <li>
                积分：
                {convertibility}
              </li>
            </ul>
          </div>
        </div>
        <div className='prize-count'>
          <PrizeCounter 
            count={ count } 
            maxCount={ surplusStock } 
            onAction={ onAction } 
            onChange={ onChange }
          />
        </div>
      </div>
    )
  }
}

export default PrizeConfirmation