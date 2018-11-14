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
    const { addressInfo, addressModalVisible } = UserModel
    const { province, city, area } = addressInfo

    return (
      <Picker
        data={ addressData }
        value={ province && city && area ? [addressInfo.province, addressInfo.city, addressInfo.area] : [] }
        visible={ addressModalVisible }
        onOk={ onConfirm }
        onDismiss={ onCancel }
      />
    )  
  }
}

export default AddressModal