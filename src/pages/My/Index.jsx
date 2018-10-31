import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AsyncComponent } from 'pms-saas-component'

const MyCenterPage = AsyncComponent(() => import('@pages/My/Center'))
const MyNewsPage = AsyncComponent(() => import('@pages/My/News'))
const MyPrizePage = AsyncComponent(() => import('@pages/My/Prize'))
const MyAddressPage = AsyncComponent(() => import('@pages/My/Address'))
const CreateAddressPage = AsyncComponent(() => import('@pages/My/CreateAddress'))

class MyPage extends Component {
  render() {
    const { match } = this.props
    const { url } = match

    return (
      <Switch>
        <Route path={ `${ url }/address/create` } component={ CreateAddressPage } />
        <Route path={ `${ url }/address` } component={ MyAddressPage } />
        <Route path={ `${ url }/prize` } component={ MyPrizePage } />
        <Route path={ `${ url }/news` } component={ MyNewsPage } />
        <Route exact path={ `${ url }` } component={ MyCenterPage } />
      </Switch>
    )
  }
}

export default MyPage