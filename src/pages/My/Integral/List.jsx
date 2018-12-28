import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ListView, PullToRefresh } from 'antd-mobile'
import IntegralItem from '@components/IntegralItem'

@inject(
  'UserModel',
)
@observer
class MyIntegralListPage extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    refreshing: true,
    isLoading:  true,
    isEmpty:    true,
  }

  integralList = []

  list = null

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '积分明细'

    this.handleSearchIntegralList()
  }

  handleSearchIntegralList = async (currentPage = 1) => {
    const { UserModel } = this.props
    const { dataSource } = this.state
    const { getIntegralList } = UserModel

    const params = {
      currentPage,
      pageSize: 10,
    }
    const result = await getIntegralList(params)

    if (result) {
      this.integralList = this.integralList.concat(result)

      this.setState({
        dataSource: dataSource.cloneWithRows(result),
        refreshing: false,
        isLoading:  false,
        isEmpty:    this.integralList.length === 0,
      })
    }
  }

  handleRefresh = async () => {
    const { UserModel } = this.props
    const { dataSource } = this.state
    const { getIntegralList } = UserModel

    this.setState({ refreshing: true, isLoading: true })

    const params = {
      currentPage: 1,
      pageSize:    10,
    }
    const result = await getIntegralList(params)
  
    if (result) {
      this.integralList = [].concat(result)
      
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
    const { hasMore, integralListPageIndex, getIntegralList } = UserModel

    if (!hasMore) return
    
    this.setState({ isLoading: true })

    const params = {
      currentPage: integralListPageIndex + 1,
      pageSize:    10,
    }
    const result = await getIntegralList(params)

    if (result) {
      this.integralList = this.integralList.concat(result)

      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(this.integralList),
          isLoading:  false,
        })
      }, 1000)
    }
  }

  render() {
    // const { UserModel } = this.props
    const { dataSource, refreshing, isLoading, isEmpty } = this.state
    // const { integralList } = UserModel

    return (
      <div className='view-container'>
        {isEmpty ? (
          <div className='empty-container'>无数据</div>
        ) : (
          <div className='integral-container'>
            <ListView
              ref={ el => this.list = el }
              className='integral-list-container'
              dataSource={ dataSource }
              renderRow={ rowData => {
                console.log(rowData)

                return (
                  <IntegralItem { ...rowData } />
                ) 
              } }
              useBodyScroll={ false }
              pullToRefresh={ (
                <PullToRefresh
                  refreshing={ refreshing } 
                  indicator={{
                  activate:   <span className='integral-list-indicator'>松开立即刷新</span>,
                  deactivate: <span className='integral-list-indicator'>下拉刷新</span>,
                  finish:     <span className='integral-list-indicator'>完成刷新</span>,
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
        )}
      </div>
    )
  }
}

export default MyIntegralListPage