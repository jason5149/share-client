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
    }, 500)
  }

  handleEndReached = () => {
    console.log('reach end')
  }

  render() {
    const { dataSource, refreshing } = this.state

    return (
      <ListView 
        className='news-list-container'
        ref={ el => this.list = el }
        dataSource={ dataSource }
        renderRow={ rowData => <Item { ...rowData } /> }
        PullToRefresh={ (
          <PullToRefresh
            refreshing={ refreshing } 
            onRefresh={ this.handleRefresh }
          />
        ) }
        onEndReached={ this.handleEndReached }
        onEndReachedThreshold={ 10 }
      />
    )
  }
}

export default List