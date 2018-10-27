import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { AsyncComponent } from 'pms-saas-component'

const BannerCarousel = AsyncComponent(() => import('@components/BannerCarousel'))
const NewsTabs = AsyncComponent(() => import('@components/NewsTabs'))
const NewsList = AsyncComponent(() => import('@components/NewsList'))

@inject(
  'BasicModel',
  'WxModel',
  'NewsModel',
)
@observer
class HomePage extends Component {
  state = {
    newsList: [],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchBannerList()
    this.handleSearchNewsList()
  }

  handleSearchBannerList = () => {
    const { BasicModel } = this.props
    const { getBannerList } = BasicModel

    getBannerList()
  }

  handleSearchNewsList = async () => {
    const { NewsModel } = this.props
    const { getNewsList } = NewsModel

    const newsList = await getNewsList()

    this.setState({
      newsList,
    })
  }

  handleNewsListRefresh = () => {
    console.log('onRefresh')
  }

  handleNewsListPageChange = () => {
    console.log('onReached')
  }

  render() {
    const { BasicModel, NewsModel } = this.props
    const { newsList } = this.state
    const { bannerList } = BasicModel
    const { newsTabs } = NewsModel

    return (
      <div className='page-container'>
        <BannerCarousel list={ bannerList } />
        <NewsTabs tabs={ newsTabs }>
          {newsList.length > 0 && (
            <NewsList 
              list={ newsList } 
              onRefresh={ this.handleNewsListRefresh }
              onReached={ this.handleNewsListPageChange }
            />
          )}
        </NewsTabs>
      </div>
    )
  }
}

export default HomePage