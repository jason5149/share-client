import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ListView, PullToRefresh } from 'antd-mobile'
import Prize from '@components/Prize'
import { BASE_PATH } from '@utils/const'

const { PrizeItem } = Prize

@inject(
  'UserModel',
)
@observer
class MyPrizeListPage extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    refreshing: true,
    isLoading:  true,
    isEmpty:    true,
  }

  prizeList = []

  list = null

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的奖品'

    this.handleSearchPrizeList()
  }

  handleSearchPrizeList = async (currentPage = 1) => {
    const { UserModel } = this.props
    const { dataSource } = this.state
    const { getPrizeList } = UserModel

    const params = {
      currentPage,
      pageSize: 10,
    }
    const result = await getPrizeList(params)

    if (result) {
      this.prizeList = this.prizeList.concat(result)
      this.setState({
        dataSource: dataSource.cloneWithRows(this.prizeList),
        refreshing: false,
        isLoading:  false,
        isEmpty:    this.prizeList.length === 0,
      })
    }
  }

  handleRefresh = async () => {
    const { UserModel } = this.props
    const { dataSource } = this.state
    const { getPrizeList } = UserModel

    this.setState({ refreshing: true, isLoading: true })

    const params = {
      currentPage: 1,
      pageSize:    10,
    }
    const result = await getPrizeList(params)

    if (result) {
      this.prizeList = [].concat(result)

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
    const { prizeListPageIndex, getPrizeList, hasMore } = UserModel

    if (!hasMore) return
    
    this.setState({ isLoading: true })

    const params = {
      currentPage: prizeListPageIndex + 1,
      pageSize:    10,
    }
    const result = await getPrizeList(params)

    if (result) {
      this.prizeList = this.prizeList.concat(result)

      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(this.prizeList),
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
    const { dataSource, refreshing, isLoading, isEmpty } = this.state

    return (
      <div className='view-container'>
        {isEmpty ? (
          <div className='empty-container'>无数据</div>
        ) : (
          <div className='prize-container' style={{ top: 0 }}>
            <ListView
              ref={ el => this.list = el }
              className='prize-list-container'
              dataSource={ dataSource }
              renderRow={ rowData => {
                const { prize, userAddress } = rowData

                return (
                  <PrizeItem prizeType={ 2 } { ...userAddress } { ...prize } onClick={ this.handleItemClick } />
                )
              } }
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
              renderFooter={ () => isLoading ? <div className='list-footer'>加载中</div> : <div className='list-footer'>-----我是底线-----</div> }
              scrollRenderAheadDistance={ 500 }
              scrollEventThrottle={ 20 }
              onEndReached={ this.handleEndReached }
              onEndReachedThreshold={ 10 }
            />
          </div>
        )}
      </div>
    )
  }
}

export default MyPrizeListPage
