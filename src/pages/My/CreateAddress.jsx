import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import { AsyncComponent } from 'pms-saas-component'
import { BASE_PATH } from '@utils/const'

const AddressForm = AsyncComponent(() => import('@components/AddressForm'))

@inject(
  'UserModel',
)
@observer
class CreateAddressPage extends Component {
  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '添加收货地址'
  }

  handleAddressSubmit = async addressInfo => {
    const { UserModel, history } = this.props
    const { createAddress } = UserModel

    const result = await createAddress(addressInfo)

    if (result) {
      Toast.show('添加成功', 1)

      history.push(`${ BASE_PATH }/my/address`)
    }
  }

  render() {
    return (
      <div className='page-container'>
        <AddressForm onSubmit={ this.handleAddressSubmit } />
      </div>
    )
  }
}

export default CreateAddressPage