import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast, Button } from 'antd-mobile'
import { AsyncComponent } from 'pms-saas-component'
import { BASE_PATH } from '@utils/const'

const AddressList = AsyncComponent(() => import('@components/AddressList'))

@inject(
  'UserModel',
)
@observer
class MyAddressPage extends Component {
  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的地址'

    this.handleSearchAddressList()
  }

  handleSearchAddressList = () => {
    const { UserModel } = this.props
    const { getAddressList } = UserModel

    getAddressList()
  }

  handleCreateAddress = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my/address/create`)
  }

  handleEditAddress = async item => {
    const { history } = this.props
    const { id } = item

    if (!id) return

    history.push(`${ BASE_PATH }/my/address/create?id=${ id }`)
  }

  handleDeleteAddress = async item => {
    const { UserModel } = this.props
    const { deleteAddress } = UserModel

    const result = await deleteAddress(item)

    if (result) {
      Toast.show('删除地址成功')

      this.handleSearchAddressList()
    }
  }

  handleDefaultChange = async item => {
    const { UserModel } = this.props
    const { updateAddress } = UserModel
    
    item.default = !item.default

    const result = await updateAddress(item)

    if (result) {
      Toast.show('设置默认地址成功')

      this.handleSearchAddressList()
    }
  }

  render() {
    const { UserModel } = this.props
    const { addressList } = UserModel

    return (
      <div className='page-container'>
        <AddressList 
          list={ addressList } 
          onEdit={ this.handleEditAddress }
          onDelete={ this.handleDeleteAddress }
          onDefaultChange={ this.handleDefaultChange }
        />
        <div className='bottom-btn-container'>
          <Button type='warning' onClick={ this.handleCreateAddress }>
            添加收货地址
          </Button>
        </div>
      </div>
    )
  }
}

export default MyAddressPage