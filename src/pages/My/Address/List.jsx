import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Toast } from 'antd-mobile'
import Address from '@components/Address'
import { BASE_PATH } from '@utils/const'
import { base64encode } from '@utils/tool'

const { alert } = Modal
const { AddressList, AddressBottom } = Address

@inject(
  'UserModel',
)
@observer
class AddressListPage extends Component {
  state = {
    chooseAddress: false,
    fromTarget:    '',
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的地址'

    const { history } = this.props
    const { location } = history
    const { search } = location

    if (search) {
      /* eslint-disable-next-line */
      const params = new URLSearchParams(search)
      const chooseAddress = params.get('chooseAddress')
      const fromTarget = params.get('fromTarget')

      this.setState({
        chooseAddress,
        fromTarget,
      })
    }


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
      Toast.show('设置默认地址成功', 1)
      this.handleSearchAddressList()
    }
  }

  handleActionClick = (type, item) => {
    const { UserModel, history } = this.props
    const { chooseAddress, fromTarget } = this.state
    const { deleteAddress } = UserModel

    if (type === 'create') {
      history.push(`${ BASE_PATH }/my/address/create`)
    } else if (type === 'check') {
      if (chooseAddress) {
        history.push(`${ fromTarget }?address=${ base64encode(item) }`)
      }
    } else if (type === 'edit') {
      const { id } = item
      
      history.push(`${ BASE_PATH }/my/address/create?id=${ id }`)
    } else if (type === 'delete') {
      const { id } = item

      alert('删除收货地址', '您是否要删除该收货地址？', [
        { text: '取消' },
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
    const { chooseAddress } = this.state
    const { addressList } = UserModel

    return (
      <div className='view-container relatived'>
        <AddressList
          mode={ chooseAddress ? 2 : 1 }
          list={ addressList }
          onActionClick={ this.handleActionClick }
          onDefaultChange={ this.handleDefaultChange }
        />
        {!chooseAddress && <AddressBottom onActionClick={ () => this.handleActionClick('create') } />}
      </div>
    )
  }
}

export default AddressListPage
