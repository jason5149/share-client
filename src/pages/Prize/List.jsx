import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { AsyncComponent } from 'pms-saas-component'

const PersonalIntegral = AsyncComponent(() => import('@components/PersonalIntegral'))
const PrizeList = AsyncComponent(() => import('@components/PrizeList'))

@inject(
  'PrizeModel',
)
@observer
class PrizeListPage extends Component {
  state = {
    prizeList: [],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '奖品列表'

    this.handleSearchPrizeList()
  }

  handleSearchPrizeList = async () => {
    const { PrizeModel } = this.props
    const { getPrizeList } = PrizeModel
    
    const prizeList = await getPrizeList()

    this.setState({
      prizeList,
    })
  }

  render() {
    const { prizeList } = this.state

    return (
      <div className='page-container'>
        <PersonalIntegral />
        {prizeList.length > 0 && <PrizeList list={ prizeList } />}
      </div>
    )
  }
}

export default PrizeListPage