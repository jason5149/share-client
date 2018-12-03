import React, { Component } from 'react'
import { InputItem, Button } from 'antd-mobile'

class MobileVerify extends Component {
  state = {
    mobile: '',
    vcode:  '',
  }

  handleSendVcode = () => {}

  handleCancel = () => {}
  
  handleConfirm = () => {}

  render() {
    const { mobile, vcode } = this.state

    return (
      <div className='mobile-verify-container'>
        <div className='mobile-modal-container'>
          <div className='mobile-modal-title'>请绑定手机号</div>
          <ul className='mobile-modal-form'>
            <li>
              <span className='label'>手机号：</span>
              <div className='input'>
                <InputItem value={ mobile } onChange={ value => this.setState({ mobile: value }) } />
              </div>
            </li>
            <li>
              <span className='label'>验证码：</span>
              <div className='input'>
                <InputItem value={ vcode } onChange={ value => this.setState({ vcode: value }) } />
              </div>
              <Button type='warning' size='small' onClick={ this.handleSendVcode }>获取验证码</Button>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a className='modal-btn cancel' onClick={ this.handleCancel }>取消</a>
              {/* eslint-disable-next-line */}
              <a className='modal-btn confirm' onClick={ this.handleConfirm }>绑定</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MobileVerify