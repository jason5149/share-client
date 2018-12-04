import React, { Component } from 'react'

class AddressPicker extends Component {
  render() {
    const { userName, mobile, province, city, area, address, onClick } = this.props

    return (
      /* eslint-disable-next-line */
      <div className='address-picker-container' onClick={ onClick }>
        <i className='address-icon' />
        <div className='address-desc'>
          <span className='address-name'>
            {userName}
            &nbsp;
            {mobile}
          </span>
          <span className='address-detail'>
            { `${ province }${ city }${ area }${ address }` }
          </span>
        </div>
        <i className='arrow-right-icon' />
      </div>
    )
  }
}

export default AddressPicker