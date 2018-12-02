import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AsyncComponent from '@components/AsyncComponent'

class PrizePage extends Component {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/:id` } component={ AsyncComponent(() => import('@pages/Prize/Detail')) } />
        <Route path={ `${ url }` } component={ AsyncComponent(() => import('@pages/Prize/List')) } />
      </Switch>
    )
  }
}

export default PrizePage