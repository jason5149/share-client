import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Tabs, ListView, PullToRefresh } from 'antd-mobile'
import BannerCarousel from '@components/BannerCarousel'
import News from '@components/News'

const { DefaultTabBar } = Tabs
const { NewsContainer, NewsItem } = News

@inject(
  'GlobalModel',
  'NewsModel',
)
@observer
class HomePage extends Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.list = null
    this.isRefresh = false
    this.hasMore = false

    this.state = {
      dataSource,
    }
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchBannerList()
    setTimeout(() => {
      this.handleSearchNewsList()
    })
  }

  handleSearchBannerList = () => {
    const { GlobalModel } = this.props
    const { getBannerList } = GlobalModel

    getBannerList()
  }

  handleSearchNewsList = async (currentPage = 1, tab) => {
    const { NewsModel } = this.props
    const { activedTab, setActivedTab, getNewsList } = NewsModel
    const { dataSource } = this.state

    if (this.isRefresh) return
    
    const params = {
      currentPage,
      pageSize: 10,
    }

    this.isRefresh = true

    const result = await getNewsList(params)

    if (result) {
      this.setState({
        dataSource: dataSource.cloneWithRows(result),
      }, () => {
        this.isRefresh = false
        this.list.scrollTo(0, 0)
        setActivedTab(tab)
      })
    }
  }

  handleRefresh = async () => {
    const { NewsModel } = this.props
    const { getNewsList } = NewsModel

    if (this.isRefresh) return

    const params = {
      currentPage: 1,
      pageSize:    10,
    }

    const result = await getNewsList(params)

    if (result) {
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
  
      this.setState({
        dataSource: dataSource.cloneWithRows(result),
      }, () => {
        this.isRefresh = true
      })
    }
  }

  handleEndReached = () => {
    const { NewsModel } = this.props
    const { newsListTotal } = NewsModel
    console.log('list reach end')

    console.log(newsListTotal)
  }

  handleTabChange = tab => {
    this.handleSearchNewsList(1, tab)
  }

  render() {
    const { GlobalModel, NewsModel } = this.props
    const { isRefresh, dataSource } = this.state
    const { bannerList } = GlobalModel
    const { newsTabs } = NewsModel

    return (
      <div className='view-container'>
        <BannerCarousel list={ bannerList } />
        <NewsContainer>
          <Tabs
            tabs={ newsTabs }
            renderTabBar={ props => <DefaultTabBar { ...props } page={ 6 } /> }
            onChange={ this.handleTabChange }
          >
            <ListView
              ref={ el => this.list = el }
              className='news-list-container'
              dataSource={ dataSource }
              renderRow={ rowData => <NewsItem { ...rowData } /> }
              PullToRefresh={ (
                <PullToRefresh
                  refreshing={ isRefresh } 
                  indicator={{
                    activate:   <span className='news-list-indicator'>松开立即刷新</span>,
                    deactivate: <span className='news-list-indicator'>下拉刷新</span>,
                    finish:     <span className='news-list-indicator'>完成刷新</span>,
                  }} 
                  onRefresh={ this.handleRefresh }
                />
              ) }
              onEndReached={ this.handleEndReached }
              onEndReachedThreshold={ 10 }
      
            />
          </Tabs>
        </NewsContainer>
      </div>
    )
  }
}

export default HomePage