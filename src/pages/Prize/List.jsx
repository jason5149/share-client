import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ListView, PullToRefresh } from 'antd-mobile'
import Prize from '@components/Prize'
import { BASE_PATH } from '@utils/const'

const { PrizeItem } = Prize

@inject(
  'PrizeModel'
)
@observer
class PrizeListPage extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    refreshing: true,
    isLoading:  true,
  }

  prizeList = []

  list = null

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '奖品列表'
    
    this.handleSearchPrizeList()
  }

  handleSearchPrizeList = async (currentPage = 1) => {
    const { PrizeModel } = this.props
    const { dataSource } = this.state
    const { getPrizeList } = PrizeModel

    const params = {
      currentPage,
      pageSize: 10,
    }
    const result = await getPrizeList(params)

    console.log(result)

    if (result) {
      this.prizeList = this.prizeList.concat(result)
      this.setState({
        dataSource: dataSource.cloneWithRows(this.prizeList),
        refreshing: false,
        isLoading:  false,
      })
    }
  }

  handleRefresh = async () => {
    const { UserModel } = this.props
    const { dataSource } = this.state
    const { activedTab, getNewsList } = UserModel

    this.setState({ refreshing: true, isLoading: true })

    const params = {
      currentPage: 1,
      pageSize:    10,
      status:      activedTab,
    }
    const result = await getNewsList(params)
  
    if (result) {
      this.prizeList = []
      
      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(result),
          refreshing: false,
          isLoading:  false,
        })
      }, 800)
    }
  }

  handleEndReached = async () => {
    const { UserModel } = this.props
    const { dataSource } = this.state
    const { activedTab, newsListPageIndex, getNewsList } = UserModel

    this.setState({ isLoading: true })

    const params = {
      currentPage: newsListPageIndex + 1,
      pageSize:    10,
      status:      activedTab,
    }
    const result = await getNewsList(params)

    if (result) {
      this.prizeList = this.prizeList.concat(result)

      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(this.newsList),
          isLoading:  false,
        })
      }, 1000)
    }
  }

  handleItemClick = id => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/prize/${ id }`)
  }

  render() {
    const { dataSource, refreshing, isLoading } = this.state

    return (
      <div className='view-container'>
        <div className='prize-container'>
          <ListView
            ref={ el => this.list = el }
            className='prize-list-container'
            dataSource={ dataSource }
            renderRow={ rowData => <PrizeItem { ...rowData } onClick={ this.handleItemClick } /> }
            useBodyScroll={ false }
            pullToRefresh={ (
              <PullToRefresh
                refreshing={ refreshing } 
                indicator={{
                  activate:   <span className='prize-list-indicator'>松开立即刷新</span>,
                  deactivate: <span className='prize-list-indicator'>下拉刷新</span>,
                  finish:     <span className='prize-list-indicator'>完成刷新</span>,
                }} 
                onRefresh={ this.handleRefresh }
              />
            ) }
            renderBodyComponent={ () => <div /> }
            renderFooter={ () => isLoading ? <div className='list-footer'>加载中</div> : <div className='list-footer'>底线</div> }
            scrollRenderAheadDistance={ 500 }
            scrollEventThrottle={ 20 }
            onEndReached={ this.handleEndReached }
            onEndReachedThreshold={ 10 }
          />
        </div>
      </div>
    )
  }
}

export default PrizeListPage