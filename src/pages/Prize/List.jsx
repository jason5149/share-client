import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ListView, PullToRefresh } from 'antd-mobile'
import Prize from '@components/Prize'
import IntegralOverview from '@components/IntegralOverview'
import { BASE_PATH } from '@utils/const'

const { PrizeItem } = Prize

@inject(
  'UserModel',
  'PrizeModel',
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
    document.title = '积分兑奖'

    this.handleSearchUserInfo()
    this.handleSearchPrizeList()
  }

  handleSearchUserInfo = () => {
    const { UserModel } = this.props
    const { getUserDetailInfo } = UserModel

    getUserDetailInfo()
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
    const { PrizeModel } = this.props
    const { dataSource } = this.state
    const { getPrizeList } = PrizeModel

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
    const { PrizeModel } = this.props
    const { dataSource } = this.state
    const { prizeListPageIndex, getPrizeList } = PrizeModel

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

  handleIntegralClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my/integral`)
  }

  render() {
    const { UserModel } = this.props
    const { dataSource, refreshing, isLoading } = this.state
    const { userDetailInfo } = UserModel

    return (
      <div className='view-container'>
        <IntegralOverview integral={ userDetailInfo && userDetailInfo.integral } onClick={ this.handleIntegralClick } />
        <div className='prize-container'>
          <ListView
            ref={ el => this.list = el }
            className='prize-list-container'
            dataSource={ dataSource }
            renderRow={ rowData => {
              return (
                <PrizeItem prizeType={ 1 } { ...rowData } onClick={ this.handleItemClick } />
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
            renderBodyComponent={ () => <div style={{ height: '100%' }} /> }
            renderFooter={ () => isLoading ? <div className='list-footer'>加载中</div> : <div className='list-footer'>-----我是底线-----</div> }
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
