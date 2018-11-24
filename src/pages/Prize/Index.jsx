import React, { PureComponent } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AsyncComponent from 'pms-saas-component/lib/async-component'

const PrizeListPage = AsyncComponent(() => import('@pages/Prize/List'))
const PrizeDetailPage = AsyncComponent(() => import('@pages/Prize/Detail'))

class PrizePage extends PureComponent {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/list` } component={ PrizeListPage } />
        <Route path={ `${ url }/:id` } component={ PrizeDetailPage } />
        <Route exact path={ `${ url }` } render={ () => <Redirect to={ `${ url }/list` } /> }  />
      </Switch>
    )
  }
}

export default PrizePage