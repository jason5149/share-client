import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { 
  WhiteSpace, 
  List, 
  InputItem, 
  Icon, 
  Button,
  Switch, 
  Toast, 
} from 'antd-mobile'
import { AsyncComponent } from 'pms-saas-component'

const AddressModal = AsyncComponent(() => import('@components/AddressModal'))

@inject(
  'UserModel',
)
@observer
class Form extends Component {
  state = {
    name:      '',
    phone:     '',
    address:   [],
    detail:    '',
    isDefault: false,
  }

  handleAddressPicker = () => {
    const { UserModel } = this.props
    const { toggleAddressModel } = UserModel

    toggleAddressModel()
  }

  handlePickerConfirm = address => {
    this.setState({
      address,
    })
  }

  handlePickerCancel = () => {
    this.handleAddressPicker()
  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    const { name, phone, address, detail } = this.state

    if (!name) {
      Toast.show('请输入收货人姓名', 1)
      return false
    }
    if (!phone) {
      Toast.show('请输入收货人手机号', 1)
      return false
    }
    if (address.length < 2) {
      Toast.show('请选择省/市/区', 1)
      return false
    }
    if (!detail) {
      Toast.show('请输入详细地址', 1)
      return false
    }

    onSubmit({
      name,
      phone,
      address,
      detail,
    })
  }

  render() {
    const { name, phone, address, detail, isDefault } = this.state

    return (
      <Fragment>
        <WhiteSpace size='xl' />
        <List>
          <div className='addres-item'>
            <span className='address-label'>
              收货人
            </span>
            <InputItem 
              value={ name }
              placeholder='请输入收货人姓名' 
              onChange={ value => this.setState({ name: value }) }
            />
          </div>
          <div className='addres-item'>
            <span className='address-label'>
              手机号
            </span>
            <InputItem 
              value={ phone }
              placeholder='请输入收货人手机号' 
              onChange={ value => this.setState({ phone: value }) }
            />
          </div>
          <div className='addres-item'>
            <span className='address-label'>
              省/市/区
            </span>
            {/* eslint-disable-next-line */}
            <a className='am-list-item' onClick={ this.handleAddressPicker }>
              <div className='am-list-line' layout='row' layout-align='space-between center'>
                <span className='address-picker-desc'>{address.length > 0 ? address.join('/') : '请选择省/市/区'}</span>
                <Icon type='right' style={{ color: '#999' }} />
              </div>
            </a>
          </div>
          <div className='addres-item'>
            <span className='address-label'>
              详细地址
            </span>
            <InputItem 
              value={ detail }
              placeholder='请输入详细地址' 
              onChange={ value => this.setState({ detail: value }) }
            />
          </div>
        </List>
        <WhiteSpace size='xl' />
        <List>
          <div className='addres-item address-switch'>
            <span className='address-label'>
              设置默认
            </span>
            <Switch
              checked={ isDefault }
              onChange={ () => {
                this.setState({
                  isDefault: !isDefault,
                })
            } }
            />
          </div>
        </List>
        <div className='address-form-btn'>
          <Button type='warning' onClick={ this.handleSubmit }>确认</Button>
        </div>
        <AddressModal 
          onConfirm={ this.handlePickerConfirm }
          onCancel={ this.handlePickerCancel }
        />
      </Fragment>
    )
  }
}

export default Form