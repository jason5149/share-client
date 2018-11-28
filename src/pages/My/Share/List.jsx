import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Tabs, ListView, PullToRefresh } from 'antd-mobile'
import News from '@components/UserNews'
import { BASE_PATH } from '@utils/const'

const { NewsContainer, NewsItem } = News
const { DefaultTabBar } = Tabs

@inject(
  'GlobalModel',
  'UserModel',
)
@observer
class MyShareListPage extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    refreshing: true,
    isLoading:  true,
  }

  newsList = []

  list = null

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的分享'
    
    this.handleSearchNewsList()
  }

  handleSearchNewsList = async (currentPage = 1, category = '头条') => {
    const { UserModel } = this.props
    const { dataSource } = this.state
    const { getNewsList } = UserModel

    const params = {
      currentPage,
      pageSize: 10,
      category,
    }
    const result = await getNewsList(params)

    if (result) {
      this.newsList = this.newsList.concat(result)
      this.setState({
        dataSource: dataSource.cloneWithRows(result),
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
      category:    activedTab,
    }
    const result = await getNewsList(params)
  
    if (result) {
      this.newsList = []
      
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
      category:    activedTab,
    }
    const result = await getNewsList(params)

    if (result) {
      this.newsList = this.newsList.concat(result)

      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(this.newsList),
          isLoading:  false,
        })
      }, 1000)
    }
  }

  handleTabChange = ({ title }) => {
    this.newsList = []
    this.handleSearchNewsList(1, title)
  }

  handleItemClick = id => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/news/${ id }`)
  }

  handleActionClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my`)
  }

  render() {
    const { UserModel } = this.props
    const { dataSource, refreshing, isLoading } = this.state
    const { newsTabs } = UserModel

    return (
      <div className='view-container'>
        <NewsContainer>
          <Tabs
            style={{ height: '100%' }}
            tabs={ newsTabs }
            renderTabBar={ props => <DefaultTabBar { ...props } /> }
            onChange={ this.handleTabChange }
          >
            <ListView
              ref={ el => this.list = el }
              className='news-list-container'
              dataSource={ dataSource }
              renderRow={ rowData => <NewsItem { ...rowData } onClick={ this.handleItemClick } /> }
              useBodyScroll={ false }
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
              renderBodyComponent={ () => <div /> }
              renderFooter={ () => isLoading ? <div className='list-footer'>加载中</div> : <div className='list-footer'>底线</div> }
              scrollRenderAheadDistance={ 500 }
              scrollEventThrottle={ 20 }
              onEndReached={ this.handleEndReached }
              onEndReachedThreshold={ 10 }
            />
          </Tabs>
        </NewsContainer>
      </div>
    )
  }
}

export default MyShareListPage