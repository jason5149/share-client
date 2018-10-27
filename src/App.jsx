import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { AsyncComponent } from 'pms-saas-component'
import AuthRoute from '@components/AuthRoute'
import ErrorBoundary from '@components/ErrorBoundary'
import { BASE_PATH } from '@utils/const'

const AuthPage = AsyncComponent(() => import('@pages/Auth'))
const HomePage = AsyncComponent(() => import('@pages/Home'))
const MyPage = AsyncComponent(() => import('@pages/My/Index'))
const PrizePage = AsyncComponent(() => import('@pages/Prize/Index'))

class App extends PureComponent {
  render() {
    return (
      <ErrorBoundary>
        <Router>
          <div className='container'>
            <Route exact path={ `${ BASE_PATH }/` } render={ () => <Redirect to={ `${ BASE_PATH }/home` } /> } />
            <Route path={ `${ BASE_PATH }/auth` } component={ AuthPage } />
            <AuthRoute path={ `${ BASE_PATH }/home` } component={ HomePage } />
            <AuthRoute path={ `${ BASE_PATH }/my` } component={ MyPage } />
            <AuthRoute path={ `${ BASE_PATH }/prize` } component={ PrizePage } />
          </div>
        </Router>
      </ErrorBoundary>
    )
  }
}

export default App