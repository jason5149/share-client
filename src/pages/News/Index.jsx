import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import AsyncComponent from 'pms-saas-component/lib/async-component'

const NewsDetailPage = AsyncComponent(() => import('@pages/News/Detail'))

class NewsPage extends PureComponent {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/:id` } component={ NewsDetailPage } />
      </Switch>
    )
  }
}

export default NewsPage