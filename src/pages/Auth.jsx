import React, { PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import { wxAuth4Public } from 'pms-saas-common/lib/util/wx'
import { urlParams, object2Url } from 'pms-saas-common/lib/util/object'
import { WX_APP_ID } from '@utils/const'
import { setWxUserInfo } from '../utils/cache'
import { BASE_PATH } from '../utils/const'

@inject(
  'WxModel',
)
@observer
class AuthPage extends PureComponent {
  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.destroy()
  }

  init() {
    document.title = '微信授权'

    Toast.loading('微信授权中', 10)

    const search = urlParams(window.location.href)
    /* eslint-disable-next-line */
    const params = new URLSearchParams(search)
    const code = params.get('code')

    if (code) {
      this.handleCode(code)
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
    
    window.location.replace(`${ url }?${ object2Url(authParams) }#wechat_redirect`)
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
      <div className='page-container' />
    )
  }
}

export default AuthPage