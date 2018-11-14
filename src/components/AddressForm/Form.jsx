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
import REGEX from '@utils/regex'

const AddressModal = AsyncComponent(() => import('@components/AddressModal'))

@inject(
  'UserModel',
)
@observer
class Form extends Component {
  handleAddressPicker = () => {
    const { UserModel } = this.props
    const { toggleAddressModel } = UserModel

    toggleAddressModel()
  }

  handlePickerConfirm = address => {
    const { UserModel } = this.props
    const { changeAddressInfo } = UserModel

    if (address.length === 3) {
      /* eslint-disable-next-line */
      for (let i = 0, len = address.length; i < len; i++) {
        if (i === 0) {
          changeAddressInfo('province', address[i])
        } else if (i === 1) {
          changeAddressInfo('city', address[i])
        } else if (i === 2) {
          changeAddressInfo('area', address[i])
        }
      }

      this.handlePickerCancel()
    }
  }

  handlePickerCancel = () => {
    this.handleAddressPicker()
  }

  handleSubmit = () => {
    const { UserModel, onSubmit } = this.props
    const { addressInfo } = UserModel
    const { id, userName, mobile, province, city, area, address, default: isDefault  } = addressInfo

    if (!userName) {
      Toast.show('请输入收货人姓名', 1)
      return false
    }
    if (!mobile) {
      Toast.show('请输入收货人手机号', 1)
      return false
    } else if (!REGEX.MOBILE.test(mobile)) {
      Toast.show('手机号格式不正确', 1)
      return false
    }
    if (!(province || city || area)) {
      Toast.show('请选择省/市/区', 1)
      return false
    }
    if (!address) {
      Toast.show('请输入详细地址', 1)
      return false
    }

    onSubmit({
      id,
      userName,
      mobile,
      province,
      city,
      area,
      address,
      isDefault,
    })
  }

  render() {
    const { UserModel } = this.props
    const { addressInfo = {}, changeAddressInfo } = UserModel
    const { userName = '', mobile = '', province, city, area, address = '', default: isDefault  } = addressInfo

    return (
      <Fragment>
        <WhiteSpace size='xl' />
        <List>
          <div className='addres-item'>
            <span className='address-label'>
              收货人
            </span>
            <InputItem 
              value={ userName }
              placeholder='请输入收货人姓名' 
              onChange={ value => changeAddressInfo('userName', value) }
            />
          </div>
          <div className='addres-item'>
            <span className='address-label'>
              手机号
            </span>
            <InputItem 
              value={ mobile }
              placeholder='请输入收货人手机号' 
              onChange={ value => changeAddressInfo('mobile', value) }
            />
          </div>
          <div className='addres-item'>
            <span className='address-label'>
              省/市/区
            </span>
            {/* eslint-disable-next-line */}
            <a className='am-list-item' onClick={ this.handleAddressPicker }>
              <div className='am-list-line' layout='row' layout-align='space-between center'>
                <span className='address-picker-desc'>{province && city && area ? `${ province }/${ city }/${ area }` : '请选择省/市/区'}</span>
                <Icon type='right' style={{ color: '#999' }} />
              </div>
            </a>
          </div>
          <div className='addres-item'>
            <span className='address-label'>
              详细地址
            </span>
            <InputItem 
              value={ address }
              placeholder='请输入详细地址' 
              onChange={ value => changeAddressInfo('address', value) }
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
                changeAddressInfo('default', !isDefault)
            } }
            />
          </div>
        </List>
        <div className='address-form-btn'>
          <Button type='warning' onClick={ this.handleSubmit }>确认</Button>
        </div>
        <AddressModal 
          // address={ [province, city, area] }
          onConfirm={ this.handlePickerConfirm }
          onCancel={ this.handlePickerCancel }
        />
      </Fragment>
    )
  }
}

export default Form