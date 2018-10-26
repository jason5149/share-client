import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { AsyncComponent } from 'pms-saas-component'
import AuthRoute from '@components/AuthRoute'
import ErrorBoundary from '@components/ErrorBoundary'
import { BASE_PATH } from '@utils/const'

const AuthPage = AsyncComponent(() => import('@pages/Auth'))
const HomePage = AsyncComponent(() => import('@pages/Home'))

class App extends PureComponent {
  render() {
    return (
      <ErrorBoundary>
        <Router>
          <div className='container'>
            <Route exact path={ `${ BASE_PATH }/` } render={ () => <Redirect to={ `${ BASE_PATH }/home` } /> } />
            <Route path={ `${ BASE_PATH }/auth` } component={ AuthPage } />
            <AuthRoute path={ `${ BASE_PATH }/home` } component={ HomePage } />
          </div>
        </Router>
      </ErrorBoundary>
    )
  }
}

export default App