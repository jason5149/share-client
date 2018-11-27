import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { WhiteSpace, List, InputItem, Switch, Icon, Button, Toast } from 'antd-mobile'
import REGEX from '@utils/regex'

@inject(
  'UserModel',
)
@observer
class AddressForm extends Component {
  handleSubmit = () => {
    const { UserModel, onSubmit } = this.props
    const { addressInfo } = UserModel
    const { id, userName, mobile, province, city, area, address, isDefault  } = addressInfo

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
    const { addressInfo = {}, toggleAddressModel, changeAddressInfo } = UserModel
    const { userName = '', mobile = '', province, city, area, address = '', isDefault } = addressInfo

    return (
      <div className='address-form-container'>
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
            <a className='am-list-item' onClick={ toggleAddressModel }>
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
                changeAddressInfo('isDefault', !isDefault)
            } }
            />
          </div>
        </List>
        <div className='address-form-btn'>
          <Button type='warning' onClick={ this.handleSubmit }>确认</Button>
        </div>
      </div>
    )
  }
}

export default AddressForm