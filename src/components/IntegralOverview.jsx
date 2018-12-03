import React, { Component }  from 'react'

class IntegralOverview extends Component {
  render() {
    const { integral, onClick } = this.props

    return (
      <div className='integral-overview-container'>
        <span className='integral-text'>
          积分：
          {integral}
        </span>
        {/* eslint-disable-next-line */}
        <a className='integral-list' onClick={ onClick }>积分明细</a>
      </div>
    )
  }
}

export default IntegralOverview