import React, { Component } from 'react'
import { Checkbox } from 'antd-mobile'

const { CheckboxItem } = Checkbox 

class List extends Component {
  handleDefaultChange = item => {
    const { onDefaultChange } = this.props

    onDefaultChange(item)
  }

  handleActions = (type, item) => {
    const { onEdit, onDelete } = this.props

    if (type === 'edit') {
      onEdit(item)
    } else if (type === 'delete') {
      onDelete(item)
    }
  }

  render() {
    const { list } = this.props
    
    return (
      <ul className='address-list-container'>
        {list.map(value => (
          <li key={ value.id } className='address-item-container'>
            <div className='address-item-content'>
              <div className='checkbox-container'>
                <CheckboxItem 
                  checked={ value.default } 
                  onChange={ () => this.handleDefaultChange(value) }
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
              <div className='item-desc'>
                {value.address}
              </div>
            </div>
            <div className='address-item-actions'>
              {/* eslint-disable-next-line */}
              <a className='action-btn' onClick={ () => this.handleActions('edit', value) }>编辑</a>
              {/* eslint-disable-next-line */}
              <a className='action-btn' onClick={ () => this.handleActions('delete', value) }>删除</a>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default List