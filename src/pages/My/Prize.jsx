import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { AsyncComponent } from 'pms-saas-component'

const PrizeList = AsyncComponent(() => import('@components/PrizeList'))

@inject(
  'UserModel',
)
@observer
class MyPrizePage extends Component {
  state = {
    prizeList: [],
  }
  
  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的奖品'

    this.handleSearchMyPrizeList()
  }

  handleSearchMyPrizeList = async () => {
    const { UserModel } = this.props
    const { getPrizeList } = UserModel

    const prizeList = await getPrizeList()

    this.setState({
      prizeList,
    })
  }

  handlePrizeListRefresh = () => {

  }

  handlePrizeListPageChange = () => {
    
  }
  
  render() {
    const { prizeList } = this.state

    return (
      <div className='page-container'>
        {prizeList.length > 0 && (
          <PrizeList 
            list={ PrizeList } 
            onRefresh={ this.handlePrizeListRefresh }
            onReached={ this.handlePrizeListPageChange }
          />
        )}
      </div>
    )
  }
}

export default MyPrizePage