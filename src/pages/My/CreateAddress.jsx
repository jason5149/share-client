import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { AsyncComponent } from 'pms-saas-component'

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

  handleAddressSubmit = addressInfo => {
    console.log(addressInfo)
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