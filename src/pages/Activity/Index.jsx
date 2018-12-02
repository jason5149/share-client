import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AsyncComponent from '@components/AsyncComponent'

class ActivityPage extends Component {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/news/:id` } component={ AsyncComponent(() => import('@pages/Activity/News/Detail')) } />
      </Switch>
    )
  }
}

export default ActivityPage