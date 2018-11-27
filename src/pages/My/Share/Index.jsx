import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AsyncComponent from '@components/AsyncComponent'

class MySharePage extends Component {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/:id` } component={ AsyncComponent(() => import('@pages/My/Share/Detail')) } />
        <Route path={ `${ url }` } component={ AsyncComponent(() => import('@pages/My/Share/List')) } />
      </Switch>
    )
  }
}

export default MySharePage