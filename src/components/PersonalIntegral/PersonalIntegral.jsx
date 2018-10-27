import React, { PureComponent } from 'react'

class PersonalIntegral extends PureComponent {
  render() {
    const { onInegralListClick } = this.props

    return (
      <div className='personal-integral-container'>
        <span className='personal-integral-label'>
          积分：
          <span className='personal-integral-value'>3800</span>
        </span>
        {/* eslint-disable-next-line */}
        <a className='personal-integral-value' onClick={ onInegralListClick }>积分明细</a>
      </div>
    )
  }
}

export default PersonalIntegral