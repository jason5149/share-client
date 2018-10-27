import React, { Component } from 'react'
import { ListView, PullToRefresh } from 'antd-mobile'
import Item from './Item'

class List extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    refreshing: false,
  }

  list = null

  componentDidMount() {
    this.init()
  }

  init() {
    const { list } = this.props
    const { dataSource } = this.state

    setTimeout(() => {
      this.setState({
        dataSource: dataSource.cloneWithRows(list),
      })
    })
  }

  handleRefresh = () => {
    const { onRefresh } = this.props

    this.setState({
      refreshing: true,
    })

    setTimeout(() => {
      onRefresh()

      this.setState({
        refreshing: false,
      })
    }, 800)
  }

  handleEndReached = () => {
    const { onReached } = this.props

    onReached()
  }

  render() {
    const { dataSource, refreshing } = this.state

    return (
      <ListView 
        className='news-list-container'
        ref={ el => this.list = el }
        dataSource={ dataSource }
        useBodyScroll={ false }
        renderRow={ rowData => <Item { ...rowData } /> }
        pullToRefresh={ (
          <PullToRefresh
            refreshing={ refreshing }
            indicator={{
              activate:   <span className='news-list-indicator'>松开立即刷新</span>,
              deactivate: <span className='news-list-indicator'>下拉刷新</span>,
              finish:     <span className='news-list-indicator'>完成刷新</span>,
            }} 
            onRefresh={ this.handleRefresh }
          />
        ) }
        scrollRenderAheadDistance={ 500 }
        onEndReached={ this.handleEndReached }
        onEndReachedThreshold={ 10 }
      />
    )
  }
}

export default List