import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AsyncComponent from '@components/AsyncComponent'

class MyPage extends Component {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/address` } component={ AsyncComponent(() => import('@pages/My/Address/Index')) } />
        <Route path={ `${ url }` } component={ AsyncComponent(() => import('@pages/My/Profile')) } />
      </Switch>
    )
  }
}

export default MyPage