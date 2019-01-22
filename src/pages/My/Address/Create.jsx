import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Picker, Toast } from 'antd-mobile'
import Address from '@components/Address'
import { convertAddressData } from '@utils/tool'

const { AddressForm } = Address

@inject(
  'UserModel',
)
@observer
class CreateAddressPage extends Component {
  state = {
    id:          '',
    addressData: convertAddressData(),
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '添加地址'

    const { UserModel, location } = this.props
    const { emptyAddressInfo } = UserModel
    const { search } = location

    emptyAddressInfo()

    /* eslint-disable-next-line */
    const params = new URLSearchParams(search)

    const id = params.get('id')

    if (id) {
      this.setState({
        id,
      }, () => {
        this.handleSearchAddressDetail()
      })
    }
  }

  handleSearchAddressDetail = async () => {
    const { UserModel } = this.props
    const { getAddressInfo } = UserModel
    const { id } = this.state

    getAddressInfo(id)
  }

  handleAddressSubmit = async item => {
    const { UserModel, history } = this.props
    const { createAddress, updateAddress } = UserModel
    const { id } = item

    if (id) {
      const result = await updateAddress({
        ...item,
        isDefault: item.isDefault ? 1 : 0,
      })

      if (result) {
        Toast.show('编辑成功', 1)
      }
    } else {
      const result = await createAddress({
        ...item,
        isDefault: item.isDefault ? 1 : 0,
      })

      if (result) {
        Toast.show('添加成功', 1)
      }
    }

    setTimeout(() => {
      history.goBack()
    }, 200)
  }

  render() {
    const { UserModel } = this.props
    const { id, addressData } = this.state
    const { addressInfo, addressModalVisible, handleAddressPickAction } = UserModel
    const { province, city, area } = addressInfo

    return (
      <div className='view-container'>
        <AddressForm edit={ !!id } onSubmit={ this.handleAddressSubmit } />
        <Picker
          data={ addressData }
          value={ province && city && area ? [addressInfo.province, addressInfo.city, addressInfo.area] : [] }
          visible={ addressModalVisible }
          onOk={ value => handleAddressPickAction('confirm', value) }
          onDismiss={ () => handleAddressPickAction('cancel') }
        />
      </div>
    )
  }
}

export default CreateAddressPage