import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Toast } from 'antd-mobile'
import Address from '@components/Address'
import { BASE_PATH } from '@utils/const'

const { alert } = Modal
const { AddressList, AddressBottom } = Address

@inject(
  'UserModel',
)
@observer
class AddressListPage extends Component {
  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchAddressList()
  }

  handleSearchAddressList = () => {
    const { UserModel } = this.props
    const { getAddressList } = UserModel

    getAddressList()
  }

  handleDefaultChange = async item => {
    const { UserModel } = this.props
    const { updateAddress } = UserModel

    if (item.isDefault) return
    
    item.isDefault = !item.isDefault

    const result = await updateAddress({
      ...item,
      isDefault: item.isDefault ? 1 : 0,
    })

    if (result) {
      Toast.show('设置默认地址成功')
      this.handleSearchAddressList()
    }
  }

  handleActionClick = (type, { id }) => {
    const { UserModel, history } = this.props
    const { deleteAddress } = UserModel

    if (type === 'create') {
      history.push(`${ BASE_PATH }/my/address/create`)
    } else if (type === 'edit') {
      history.push(`${ BASE_PATH }/my/address/create?id=${ id }`)
    } else if (type === 'delete') {
      alert('删除收货地址', '您是否要删除该收货地址？', [
        { text: '取消', onPress: () => console.log('cancel') },
        { 
          text:    '确认', 
          style:   { color: '#e94f4f' },
          onPress: async () => {
            const result = await deleteAddress({ id })
  
            if (result) {
              Toast.show('删除地址成功')
        
              this.handleSearchAddressList()
            }    
          }, 
        },
      ])
    }
  }

  render() {
    const { UserModel } = this.props
    const { addressList } = UserModel

    return (
      <div className='view-container relatived'>
        <AddressList 
          list={ addressList } 
          onActionClick={ this.handleActionClick }
          onDefaultChange={ this.handleDefaultChange }
        />
        <AddressBottom onActionClick={ () => this.handleActionClick('create') } />
      </div>
    )
  }
}

export default AddressListPage