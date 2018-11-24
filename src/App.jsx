import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import AsyncComponent from 'pms-saas-component/lib/async-component'
import AuthRoute from '@components/AuthRoute'
import ErrorBoundary from '@components/ErrorBoundary'
import { BASE_PATH } from '@utils/const'
import { getWxUserInfo, setUserInfo } from '@utils/cache'

const AuthPage = AsyncComponent(() => import('@pages/Auth'))
const HomePage = AsyncComponent(() => import('@pages/Home/Index'))
const NewsPage = AsyncComponent(() => import('@pages/News/Index'))
const MyPage = AsyncComponent(() => import('@pages/My/Index'))
const PrizePage = AsyncComponent(() => import('@pages/Prize/Index'))

@inject(
  'UserModel',
)
@observer
class App extends PureComponent {
  state = {
    wxUserInfo: getWxUserInfo(),
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    const { UserModel } = this.props
    const { wxUserInfo } = this.state
    const { login } = UserModel

    if (wxUserInfo) {
      const { openId: openid } = wxUserInfo

      const result = await login({ openid })

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
            <Route path={ `${ BASE_PATH }/auth` } component={ AuthPage } />
            <AuthRoute path={ `${ BASE_PATH }/home` } component={ HomePage } />
            <AuthRoute path={ `${ BASE_PATH }/news` } component={ NewsPage } />
            <AuthRoute path={ `${ BASE_PATH }/my` } component={ MyPage } />
            <AuthRoute path={ `${ BASE_PATH }/prize` } component={ PrizePage } />
          </div>
        </Router>
      </ErrorBoundary>
    )
  }
}

export default App