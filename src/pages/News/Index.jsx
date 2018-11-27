import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AsyncComponent from '@components/AsyncComponent'

class NewsPage extends Component {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/:id` } component={ AsyncComponent(() => import('@pages/News/Detail')) } />
      </Switch>
    )
  }
}

export default NewsPage