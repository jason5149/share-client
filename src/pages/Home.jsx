import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Tabs, ListView, PullToRefresh, Toast } from 'antd-mobile'
import News from '@components/News'
import ActionBtn from '@components/ActionBtn'
import BannerCarousel from '@components/BannerCarousel'
import { BASE_PATH } from '@utils/const'
import { getUserInfo, setUserInfo, getWxUserInfo } from '@utils/cache'

const { DefaultTabBar } = Tabs
const { NewsContainer, NewsItem } = News

@inject(
  'GlobalModel',
  'NewsModel',
  'UserModel',
)
@observer
class HomePage extends Component {
  state = {
    userInfo:   getUserInfo(),
    wxUserInfo: getWxUserInfo(),
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

  async init() {
    document.title = '首页'

    const { UserModel } = this.props
    const { userInfo, wxUserInfo } = this.state
    const { login } = UserModel

    if (!userInfo) {
      Toast.loading('加载中')

      const { openId: openid } = wxUserInfo

      const result = await login({ openid })

      Toast.hide()

      if (result) {
        setUserInfo(result)
      }
    }

    this.handleSearchBannerList()
    this.handleSearchNewsList()
  }

  handleSearchBannerList = () => {
    const { GlobalModel } = this.props
    const { getBannerList } = GlobalModel

    getBannerList()
  }

  handleSearchNewsList = async (currentPage = 1, category = '头条') => {
    const { NewsModel } = this.props
    const { dataSource } = this.state
    const { getNewsList } = NewsModel

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
    const { NewsModel } = this.props
    const { dataSource } = this.state
    const { activedTab, getNewsList } = NewsModel

    this.setState({ refreshing: true, isLoading: true })

    const params = {
      currentPage: 1,
      pageSize:    10,
      category:    activedTab,
    }
    const result = await getNewsList(params)
  
    if (result) {
      this.newsList = []

      this.newsList = this.newsList.concat(result)

      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(this.newsList),
          refreshing: false,
          isLoading:  false,
        })
      }, 800)
    }
  }

  handleEndReached = async () => {
    const { NewsModel } = this.props
    const { dataSource } = this.state
    const { activedTab, hasMore, newsListPageIndex, getNewsList } = NewsModel

    if (!hasMore) return

    this.setState({ isLoading: true })

    const params = {
      currentPage: newsListPageIndex + 1,
      pageSize:    10,
      category:    activedTab,
    }
    const result = await getNewsList(params)

    if (result) {
      this.newsList = this.newsList.concat(result)

      console.log(this.newsList)

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

  handleBannerClick = url => {
    if (!url) return

    window.location.href = url
  }

  handleItemClick = id => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/news/${ id }`)
  }

  handleActionClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my/share`)
  }

  render() {
    const { GlobalModel, NewsModel } = this.props
    const { dataSource, refreshing, isLoading } = this.state
    const { bannerList } = GlobalModel
    const { newsTabs } = NewsModel

    return (
      <Fragment>
        <BannerCarousel list={ bannerList } onClick={ this.handleBannerClick } />
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
        <ActionBtn text='我的分享' type={ 1 } onClick={ this.handleActionClick } />
      </Fragment>
    )
  }
}

export default HomePage