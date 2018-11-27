import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AsyncComponent from '@components/AsyncComponent'

class MyAddressPage extends Component {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/create` } component={ AsyncComponent(() => import('@pages/My/Address/Create')) } />
        <Route path={ `${ url }` } component={ AsyncComponent(() => import('@pages/My/Address/List')) } />
      </Switch>
    )
  }
}

export default MyAddressPage