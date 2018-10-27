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

  render() {
    const { dataSource, refreshing } = this.state

    return (
      <div className='prize-list-container'>
        <ListView 
          style={{
            height:   '100%',
            overflow: 'auto',
          }}
          ref={ el => this.list = el }
          dataSource={ dataSource }
          useBodyScroll={ false }
          renderRow={ rowData => <Item { ...rowData } /> }
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
          scrollRenderAheadDistance={ 500 }
          onEndReached={ this.handleEndReached }
          onEndReachedThreshold={ 10 }
        />
      </div>
    )
  }
}

export default List