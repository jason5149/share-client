import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import { stringify, parse } from 'qs'
import { wxAuth4Public } from '@utils/wx'
import { setWxUserInfo } from '@utils/cache'
import { BASE_PATH, WX_APP_ID } from '@utils/const'

@inject(
  'WxModel',
)
@observer
class AuthPage extends Component {
  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.destroy()
  }

  init() {
    document.title = '微信授权'

    Toast.loading('微信授权中', 10)

    const url = window.location.href
    let wxCode = ''

    if (url.indexOf('?') !== -1) {
      const search = parse(url.split('?')[1])
      wxCode = search.code
    }

    if (wxCode) {
      this.handleCode(wxCode)
    } else {
      this.handleAuth()
    }
  }

  destroy() {
    Toast.hide()
  }

  handleAuth = () => {
    const appId = WX_APP_ID
    const url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    const redirectUrl = window.location.href.split('?')[0]
    const authParams = wxAuth4Public(appId, redirectUrl, 'userInfo')

    window.location.replace(`${ url }?${ stringify(authParams) }#wechat_redirect`)
  }

  handleCode = async code => {
    const { WxModel, history } = this.props
    const { getWxUserInfoByCode } = WxModel

    const wxUserInfo = await getWxUserInfoByCode({ code })

    if (wxUserInfo) {
      setWxUserInfo(wxUserInfo)

      history.replace(`${ BASE_PATH }/home`)
    }
  }

  render() {
    return (
      <div className='view-container' />
    )
  }
}

export default AuthPage
