import React, { Component } from 'react'

class IntegralItem extends Component {
  render() {
    const { desc, createTime, intergral } = this.props
    const date = new Date(createTime)

    return (
      <div className='integral-item-container'>
        <div className='integral-infos'>
          <span className='integral-desc'>{desc}</span>
          <span className='integral-sub'>
            {
              `${ date.getFullYear() }/${ date.getMonth() + 1 < 10 ? `0${ date.getMonth() + 1 }` : date.getMonth() + 1 }/${ date.getDate() < 10 ? `0${  date.getDate() }` : date.getDate() }  ${ date.getHours() < 10 ? `0${ date.getHours() }` : date.getHours() }:${ date.getMinutes() < 10 ? `0${ date.getMinutes() }` : date.getMinutes() }:${ date.getSeconds() < 10 ? `0${ date.getSeconds() }` : date.getSeconds() }` 
            }
          </span>
        </div>
        <span className={ `integral-value ${ (`${  intergral }`).indexOf('-') !== -1 ? 'minus' : 'plus' }` }>
          {intergral}
        </span>
      </div>
    )
  }
}

export default IntegralItem