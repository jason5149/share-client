import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import AuthRoute from '@components/AuthRoute'
import ErrorBoundary from '@components/ErrorBoundary'
import AsyncComponent from '@components/AsyncComponent'
import { BASE_PATH } from '@utils/const'
import { JS_API_LIST } from '@utils/config'
import { wxConfig } from '@utils/wx'
import { getWxUserInfo, setUserInfo } from '@utils/cache'

// const NewsPage = AsyncComponent(() => import('@pages/News/Index'))
// const PrizePage = AsyncComponent(() => import('@pages/Prize/Index'))

@inject(
  'WxModel',
  'UserModel',
)
@observer
class App extends Component {
  state = {
    wxUserInfo: getWxUserInfo(),
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    const { WxModel, UserModel } = this.props
    const { wxUserInfo } = this.state
    const { getWxConfig } = WxModel
    const { login } = UserModel

    if (wxUserInfo) {
      const { openId: openid } = wxUserInfo

      const result = await login({ openid })

      if (result) {
        setUserInfo(result)
      }

      const url = window.location.href

      const wxConfigResult = await getWxConfig({ url })

      if (wxConfigResult) {
        const { appId, nonceStr, signature, timestamp  } = wxConfigResult
        const configResult = await wxConfig(appId, timestamp, nonceStr, signature, JS_API_LIST)
        
        console.log('wxConfig', configResult)
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
            <AuthRoute path={ `${ BASE_PATH }/my` } component={ AsyncComponent(() => import('@pages/My/Index')) } />
            {/* <AuthRoute path={ `${ BASE_PATH }/prize` } component={ PrizePage } /> */}
          </div>
        </Router>
      </ErrorBoundary>
    )
  }
}

export default App