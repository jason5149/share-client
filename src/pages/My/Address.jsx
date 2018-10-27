import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
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

  render() {
    return (
      <div className='page-container'>
        <AddressList />
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