import React, { Component, Fragment } from 'react'
import { ListView, PullToRefresh } from 'antd-mobile'
import Item from './Item'

class List extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    refreshing: false,
  }

  elem = null

  componentDidMount() {
    console.log('init')
    this.init()
  }

  componentWillReceiveProps() {
    console.log('update')
    this.init()
  }

  init() {
    const { list } = this.props
    const { dataSource } = this.state

    setTimeout(() => {
      console.log(this.elem && this.elem.scrollTo(0, 0))
      // this.elem.ListView.scrollTo(0, 0)
      // this.elem
      // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 0), 800);
      // setTimeout(() => this.refs.lv.scrollTo(0, 0), 800);
      this.setState({
        dataSource: dataSource.cloneWithRows(list),
      })
    }, 200)
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
    const { onClick } = this.props
    const { dataSource, refreshing } = this.state

    return (
      <Fragment>
        <ListView 
          className='news-list-container'
          ref={ el => this.elem = el }
          dataSource={ dataSource }
          useBodyScroll={ false }
          renderRow={ rowData => <Item { ...rowData } onClick={ onClick } /> }
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
          renderFooter={ () => <div layout='row' layout-align='center center'>——————我是底线——————</div> }
          scrollRenderAheadDistance={ 500 }
          onEndReached={ this.handleEndReached }
          onEndReachedThreshold={ 10 }
        />
      </Fragment>
    )
  }
}

export default List