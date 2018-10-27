import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Picker } from 'antd-mobile'
import { convertAddressData } from '@utils/tool'

@inject(
  'UserModel',
)
@observer
class AddressModal extends Component {
  state = {
    addressData: convertAddressData(),
  }

  render() {
    const { UserModel, onConfirm, onCancel } = this.props
    const { addressData } = this.state
    const { addressModalVisible } = UserModel

    return (
      <Picker
        data={ addressData }
        visible={ addressModalVisible }
        onOk={ onConfirm }
        onDismiss={ onCancel }
      />
    )  
  }
}

export default AddressModal