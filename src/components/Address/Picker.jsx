import React, { Component, Fragment } from 'react'

class AddressPicker extends Component {
  renderAddressDesc = () => {
    const { 
      userName = '', 
      mobile = '', 
      province = '', 
      city = '', 
      area = '', 
      address = '', 
    } = this.props

    if (userName) {
      return (
        <Fragment>
          <span className='address-name'>
            {userName}
            &nbsp;
            {mobile}
          </span>
          <span className='address-detail'>
            { `${ province }${ city }${ area }${ address }` }
          </span>
        </Fragment>
      )
    } else {
      return <span className='address-detail'>请先添加收货地址</span>
    }
  }

  render() {
    const { onClick } = this.props

    return (
      /* eslint-disable-next-line */
      <div className='address-picker-container' onClick={ onClick }>
        <i className='address-icon' />
        <div className='address-desc'>
          {this.renderAddressDesc()}
        </div>
        <i className='arrow-right-icon' />
      </div>
    )
  }
}

export default AddressPicker