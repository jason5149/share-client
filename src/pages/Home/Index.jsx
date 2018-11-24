import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import AsyncComponent from 'pms-saas-component/lib/async-component'
import { BASE_PATH } from '../../utils/const'

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
    document.title = '首页'

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

  handleNewsDetailClick = id => {
    const { history } = this.props

    if (!id) return

    history.push(`${ BASE_PATH }/news/${ id }`)
  }

  handleNewsListRefresh = () => {
    
  }

  handleNewsListPageChange = () => {

  }

  render() {
    const { BasicModel, NewsModel } = this.props
    const { newsList } = this.state
    const { bannerList } = BasicModel
    const { newsTabs } = NewsModel

    return (
      <div className='page-container'>
        <BannerCarousel list={ bannerList } />
        <div
          style={{
              position: 'absolute',
              top:      '156px',
              right:    0,
              bottom:   0,
              left:     0,
            }}
        >
          <NewsTabs tabs={ newsTabs }>
            <div
              style={{
                position: 'absolute',
                top:      0,
                right:    0,
                bottom:   0,
                left:     0,
              }}
            >
              {newsList.length > 0 && (
              <NewsList 
                list={ newsList } 
                onClick={ this.handleNewsDetailClick }
                onRefresh={ this.handleNewsListRefresh }
                onReached={ this.handleNewsListPageChange }
              />
            )}
            </div>
          </NewsTabs>
        </div>
      </div>
    )
  }
}

export default HomePage