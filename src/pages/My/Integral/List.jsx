import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject(
  'UserModel',
)
@observer
class MyIntegralListPage extends Component {
  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '积分明细'

    this.handleSearchIntegralList()
  }

  handleSearchIntegralList = () => {
    const { UserModel } = this.props
    const { getIntegralList } = UserModel

    getIntegralList()
  }

  render() {
    return (
      <div className='view-container'>
        MyIntegralListPage
      </div>
    )
  }
}

export default MyIntegralListPage