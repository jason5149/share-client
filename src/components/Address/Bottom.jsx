import React, { Component } from 'react'
import { Button } from 'antd-mobile'

class AddressBottom extends Component {
  render() {
    const { onActionClick } = this.props
    
    return (
      <div className='address-bottom-container'>
        <Button type='warning' onClick={ onActionClick }>
            添加收货地址
        </Button>
      </div>
    )
  }
}

export default AddressBottom