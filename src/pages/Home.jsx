import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Tabs, ListView, PullToRefresh } from 'antd-mobile'
import News from '@components/News'
import ActionBtn from '@components/ActionBtn'
import BannerCarousel from '@components/BannerCarousel'
import { BASE_PATH } from '@utils/const'

const { DefaultTabBar } = Tabs
const { NewsContainer, NewsItem } = News

@inject(
  'GlobalModel',
  'NewsModel',
)
@observer
class HomePage extends Component {
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
    this.handleSearchBannerList()
    this.handleSearchNewsList()
  }

  handleSearchBannerList = () => {
    const { GlobalModel } = this.props
    const { getBannerList } = GlobalModel

    getBannerList()
  }

  handleSearchNewsList = async (currentPage = 1) => {
    const { NewsModel } = this.props
    // const { activedTab, setActivedTab, getNewsList } = NewsModel
    const { getNewsList } = NewsModel
    const { dataSource } = this.state

    const params = {
      currentPage,
      pageSize: 10,
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
    const { NewsModel } = this.props
    const { getNewsList } = NewsModel
    const { dataSource } = this.state

    this.setState({ refreshing: true, isLoading: true })

    const params = {
      currentPage: 1,
      pageSize:    10,
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
    const { NewsModel } = this.props
    const { newsListPageIndex, getNewsList } = NewsModel
    const { dataSource } = this.state

    this.setState({ isLoading: true })

    const params = {
      currentPage: newsListPageIndex + 1,
      pageSize:    10,
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

  handleTabChange = tab => {
    this.newsList = []
    this.handleSearchNewsList(1, tab)
  }

  handleItemClick = id => {
    console.log(id)
  }

  handleActionClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my`)
  }

  render() {
    const { GlobalModel, NewsModel } = this.props
    const { dataSource, refreshing, isLoading } = this.state
    const { bannerList } = GlobalModel
    const { newsTabs } = NewsModel

    return (
      <Fragment>
        <BannerCarousel list={ bannerList } />
        <NewsContainer>
          <Tabs
            style={{ height: '100%' }}
            tabs={ newsTabs }
            renderTabBar={ props => <DefaultTabBar { ...props } page={ 6 } /> }
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
        <ActionBtn onClick={ this.handleActionClick } />
      </Fragment>
    )
  }
}

export default HomePage