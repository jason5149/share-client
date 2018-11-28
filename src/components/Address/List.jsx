import React, { Component } from 'react'
import { Checkbox } from 'antd-mobile'

const { CheckboxItem } = Checkbox 

class AddressList extends Component {
  renderAddressItem = value => {
    const { onActionClick, onDefaultChange } = this.props

    return (
      <li 
        key={ value.id }
        className='address-item-container'
      >
        <div className='address-item-content'>
          <div className='checkbox-container'>
            <CheckboxItem 
              checked={ value.isDefault } 
              onChange={ () => onDefaultChange(value) }
            />
          </div>
          <div className='item-desc'>
            {value.userName}
            &nbsp;
            {value.mobile}
          </div>
          <div className='item-desc'>
            {value.province}
            &nbsp;
            {value.city}
            &nbsp;
            {value.area}
          </div>
          <div className='item-desc'>{value.address}</div>
        </div>
        <div className='address-item-actions'>
          {/* eslint-disable-next-line */}
          <a className='actions-btn' onClick={ () => onActionClick('edit', value) }>
            <i className='edit-icon' />
            编辑
          </a>
          {/* eslint-disable-next-line */}
          <a className='actions-btn' onClick={ () => onActionClick('delete', value) }>
            <i className='delete-icon' />
            删除
          </a>
        </div>
      </li>
    )
  }

  render() {
    const { list } = this.props

    return (
      <ul className='address-list-container'>
        {list.map(this.renderAddressItem)}
      </ul>
    )
  }
}

export default AddressList