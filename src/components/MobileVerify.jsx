import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { InputItem, Button, Toast } from 'antd-mobile'
import REGEX from '@utils/regex'

@inject(
  'UserModel'
)
@observer
class MobileVerify extends Component {
  state = {
    mobile:    '',
    vcode:     '',
    vcodeDesc: '获取验证码',
    isSent:    false,
  }

  timer = null

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.destroy()
  }

  init() {
    
  }

  destroy() {
    this.handleStopCountDown()
  }

  handleStartCounDown = () => {
    let count = 60

    this.timer = setInterval(() => {
      if (count > 0) {
        --count

        this.setState({
          vcodeDesc: `${ count }秒`,
        })
      } else {
        this.handleStopCountDown()
      }
    }, 1000)
  }

  handleStopCountDown = () => {
    clearInterval(this.timer)
    this.timer = null
    this.setState({
      vcodeDesc: '获取验证码',
    })
  }

  handleSendVcode = async () => {
    const { UserModel } = this.props
    const { mobile, isSent } = this.state
    const { sendVcode } = UserModel

    if (isSent) {
      Toast.show('验证码已发送', 1)
      return
    }

    if (!mobile) {
      Toast.show('请输入手机号', 1)
      return
    } else if (!REGEX.MOBILE.test(mobile)) {
      Toast.show('手机号码不正确', 1)
      return
    }

    const result = await sendVcode({ mobile })

    if (result) {
      Toast.show('发送成功', 1)
      this.setState({
        isSent: true,
      })
      this.handleStartCounDown()
    }
  }

  handleCancel = () => {
    const { onCancel } = this.props

    onCancel()
  }
  
  handleConfirm = () => {
    const { onConfirm } = this.props
    const { mobile, vcode } = this.state

    if (!mobile) {
      Toast.show('请输入手机号', 1)
      return
    } else if (!REGEX.MOBILE.test(mobile)) {
      Toast.show('手机号码不正确', 1)
      return
    }

    if (!vcode) {
      Toast.show('请输入验证码', 1)
      return
    } else if (!REGEX.VCODE.test(vcode)) {
      Toast.show('验证码不正确', 1)
      return
    }

    onConfirm({ mobile, vcode })
  }

  render() {
    const { mobile, vcode, vcodeDesc } = this.state

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
              <Button type='warning' size='small' onClick={ this.handleSendVcode }>{vcodeDesc}</Button>
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