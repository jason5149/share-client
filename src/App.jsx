import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import AuthRoute from '@components/AuthRoute'
import ErrorBoundary from '@components/ErrorBoundary'
import AsyncComponent from '@components/AsyncComponent'
import { BASE_PATH } from '@utils/const'
import { JS_API_LIST } from '@utils/config'
import { wxConfig } from '@utils/wx'
import { getUserInfo, setUserInfo, getWxUserInfo } from '@utils/cache'

@inject(
  'WxModel',
  'UserModel',
)
@observer
class App extends Component {
  state = {
    userInfo:   getUserInfo(),
    wxUserInfo: getWxUserInfo(),
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    const { WxModel, UserModel } = this.props
    const { userInfo, wxUserInfo } = this.state
    const { getWxConfig } = WxModel
    const { login } = UserModel

    const url = window.location.href

    const wxConfigResult = await getWxConfig({ url })

    if (wxConfigResult) {
      const { appId, nonceStr, signature, timestamp  } = wxConfigResult

      await wxConfig(appId, timestamp, nonceStr, signature, JS_API_LIST)
    }

    if (!userInfo) {
      Toast.loading('加载中')
      /* eslint-disable-next-line */
      const search = new URLSearchParams(window.location.search)
      const { openId: openid } = wxUserInfo
      const type = search.get('type')
      const id = search.get('id')

      const params = {
        openid,
      }

      if (type === 1 && id) {
        params.partnerId = id
      }

      const result = await login(params)

      Toast.hide()

      if (result) {
        setUserInfo(result)
      }
    } else {
      const { openid } = userInfo

      const result = await login({
        openid,
      })

      if (result) {
        setUserInfo(result)
      }
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <Router>
          <div className='container'>
            <Route exact path={ `${ BASE_PATH }/` } render={ () => <Redirect to={ `${ BASE_PATH }/home` } /> } />
            <Route path={ `${ BASE_PATH }/auth` } component={ AsyncComponent(() => import('@pages/Auth')) } />
            <AuthRoute path={ `${ BASE_PATH }/home` } component={ AsyncComponent(() => import('@pages/Home')) } />
            <AuthRoute path={ `${ BASE_PATH }/news` } component={ AsyncComponent(() => import('@pages/News/Index')) } />
            <AuthRoute path={ `${ BASE_PATH }/prize` } component={ AsyncComponent(() => import('@pages/Prize/Index')) } />
            <AuthRoute path={ `${ BASE_PATH }/my` } component={ AsyncComponent(() => import('@pages/My/Index')) } />
            <AuthRoute path={ `${ BASE_PATH }/follow` } component={ AsyncComponent(() => import('@pages/Follow')) } />
            <AuthRoute path={ `${ BASE_PATH }/activity` } component={ AsyncComponent(() => import('@pages/Activity/Index')) } />
            {/* <AuthRoute path={ `${ BASE_PATH }/prize` } component={ PrizePage } /> */}
          </div>
        </Router>
      </ErrorBoundary>
    )
  }
}

export default App
